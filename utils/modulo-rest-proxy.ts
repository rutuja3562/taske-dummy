//-----------------------------------------------------------------------------------------------------------
// File: utils/modulo-rest-proxy.ts
//-----------------------------------------------------------------------------------------------------------

import axios from "axios";
import {
  Actor,
  ActorMeta,
  getActor,
  Message,
  MessageResult,
  sendMessage,
} from "./modulo-plus";
import {
  AppConfiguration,
  ClientActor,
  RestServiceActor,
  config as appConfig,
} from "../config";
import { afterDelayOf } from "./exec";

//-----------------------------------------------------------------------------------------------------------

// Check if the environment has Buffer, otherwise use a polyfill or another method
const isNode = typeof Buffer !== "undefined";
const encodeBase64 = (str: string) =>
  isNode ? Buffer.from(str).toString("base64") : btoa(str);

//-----------------------------------------------------------------------------------------------------------

const axiosInputProcessor = (input: any) => input;
const axiosResponseProcessor = (response: any) => response.data;
const axiosErrorProcessor = (error: any) =>
  error.response?.data?.error || error?.message || error;

//-----------------------------------------------------------------------------------------------------------

const messageHandler = async (
  config: Record<string, any> = {},
  processors: {
    input: (input: any) => any;
    response: (response: any) => any;
    error: (error: any) => any;
  } = {
    input: axiosInputProcessor,
    response: axiosResponseProcessor,
    error: axiosErrorProcessor,
  },
  message: Message,
  actor: Actor,
): Promise<Actor> => {
  const {
    endPoint,
    httpMethod = "POST",
    httpHeaders = {},
    timeout = 10000,
  } = config;
  const {
    input: processInput,
    response: processResponse,
    error: processError,
  } = processors;

  // Prepare Authorization header if token exists
  let authHeader = {};
  if (message.token) {
    const base64Token = encodeBase64(`:${message.token}`);
    authHeader = { Authorization: `Basic ${base64Token}` };
  }

  try {
    const axiosConfig = processInput({
      method: httpMethod[message.name] || "POST",
      url: `${endPoint}/${actor.name}/${message.name}`,
      data: message.payload,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "X-Modulo-Message-Id": message.id,
        "X-Modulo-From": message.from,
        "X-Modulo-Confidential": message.confidential,
        ...authHeader,
        ...httpHeaders,
      },
      timeout,
    });

    const result = await axios(axiosConfig);

    // Verify the response messageId
    const responseMessageId = result.headers["x-modulo-message-id"];
    if (responseMessageId !== message.id) {
      throw new Error(
        `Mismatched messageId in response: expected ${message.id} but got ${responseMessageId}`,
      );
    }

    sendMessage({
      name: `${message.name}-${MessageResult.Success}`,
      payload: processResponse(result),
      from: message.to,
      to: message.from!,
      confidential: message.confidential,
    });
  } catch (error) {
    handleErrorResponse(error, message, actor, timeout);
  }

  return actor;
};

const handleErrorResponse = (
  error: any,
  message: Message,
  actor: Actor,
  timeout: number,
) => {
  const errorMessage = constructErrorMessage(
    error,
    message.name,
    actor.name,
    message.id!,
    timeout,
  );
  console.log("error>>>", error.response);
  const isSessionExpired = error.response?.status === 401;

  sendMessage({
    name: `${message.name}-${MessageResult.Failure}`,
    payload: errorMessage,
    from: actor.name,
    to: message.from!,
    confidential: message.confidential,
  });

  if (isSessionExpired) {
    const authClient = getAuthManager("client", appConfig as AppConfiguration);
    if (authClient) {
      sendMessage({
        name: (authClient as ClientActor).sessionExpiredMessageName!,
        from: actor.name,
        to: authClient.name,
      });
    }
  }
};

const constructErrorMessage = (
  error: any,
  messageName: string,
  actorName: string,
  messageId: string,
  timeout: number,
) => {
  if (error.response) {
    if (error.response.status === 401) {
      return `Unauthorized: Access is denied due to invalid credentials. | ${messageId} | ${actorName}/${messageName} | ${error.response.statusText}`;
    } else {
      return `Error ${error.response.status}: ${error.response.statusText} | ${messageId} | ${actorName}/${messageName}`;
    }
  } else if (error.code === "ECONNABORTED") {
    return `Request timed out after ${timeout}ms | ${messageId} | ${actorName}/${messageName}`;
  } else if (error.isAxiosError && !error.response) {
    return `Unable to connect to the server | ${messageId} | ${actorName}/${messageName}`;
  } else {
    return `${error.message || "An unknown error occurred"} | ${messageId}`;
  }
};

//-----------------------------------------------------------------------------------------------------------

export const createRestProxyActor = (
  serviceActorName: string,
  config: Record<string, any> = {},
  processors?: {
    input: (input: any) => any;
    response: (response: any) => any;
    error: (error: any) => any;
  },
): Actor & ActorMeta => ({
  name: serviceActorName,
  state: "ready",
  data: {},
  messageHandler: messageHandler.bind(null, config, processors),
  config,
});

//-----------------------------------------------------------------------------------------------------------

function getAuthManager(
  actorType: string,
  config: AppConfiguration,
): ClientActor | RestServiceActor | undefined {
  return Object.values(config.actors).find(
    (actor) => actor.isAuthManager && actor.type === actorType,
  );
}

//-----------------------------------------------------------------------------------------------------------
