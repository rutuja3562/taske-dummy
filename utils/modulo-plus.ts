//-----------------------------------------------------------------------------------------------------------
// File: utils/modulo-plus.ts
//-----------------------------------------------------------------------------------------------------------

import "react-native-get-random-values";
import { v4 } from "uuid";

//-----------------------------------------------------------------------------------------------------------

export type Actor = {
  name: string;
  state: string;
  data: any;
  error?: string;
};

//-----------------------------------------------------------------------------------------------------------

export type ActorMeta = {
  config: Record<string, any>;
  queue?: Array<Message>;
  isBusy?: boolean;
  messageHandler: (message: Message, actor: Actor) => Promise<Actor>;
};

//-----------------------------------------------------------------------------------------------------------

export enum MessageResult {
  Success = "success",
  Failure = "failure",
}

//-----------------------------------------------------------------------------------------------------------

export type Message = {
  id?: string;
  name: string;
  payload?: any; // Optional payload
  from?: string;
  to: string;
  confidential?: boolean;
  timestamp?: string;
  token?: string;
};

//-----------------------------------------------------------------------------------------------------------

// System id
let systemId: string = v4();

// Use a Map for actors
let actors = new Map<string, Actor & ActorMeta>();

// Map to store listeners for each actor
let listeners = new Map<string, Set<(actor: Actor) => void>>();

// Global listeners for all actors
let globalListeners = new Set<(actor: Actor) => void>();

//-----------------------------------------------------------------------------------------------------------

// Add or update an actor in the map
export const addActor = (actor: Actor & ActorMeta) => {
  const existingActor = actors.get(actor.name);
  const queue = existingActor ? existingActor.queue : [];
  actors.set(actor.name, { ...actor, queue: queue ?? [], isBusy: false });
};

//-----------------------------------------------------------------------------------------------------------

// Remove an actor from the map
export const removeActor = (actor: Actor | string) => {
  const name = typeof actor === "string" ? actor : actor.name;
  actors.delete(name);
  listeners.delete(name); // Optionally, remove listeners when the actor is removed
};

//-----------------------------------------------------------------------------------------------------------

// Get an actor by name
export const getActor = (name: string) => actors.get(name);

//-----------------------------------------------------------------------------------------------------------

// Send a message to an actor and notify listeners
export const sendMessage = (message: Message) => {
  const actor = actors.get(message.to);
  if (!actor) {
    throw new Error(`Invalid actor: ${message.to}`);
  } else {
    console.log(
      "(%+) QUEUEING MESSAGE:",
      `${actor.name}/${message.name}`,
      message.confidential ? "PAYLOAD HIDDEN" : message.payload,
    );
    actor.queue!.push({
      id: message.id ?? v4(),
      timestamp: new Date().toISOString(),
      from: "ui",
      confidential: false,
      payload: {},
      ...message,
    });
  }
};

//-----------------------------------------------------------------------------------------------------------

const processNextMessage = async (_actor: Actor & ActorMeta) => {
  if (_actor.isBusy || _actor.queue!.length === 0) {
    return;
  }

  const nextMessage = _actor.queue!.splice(0, 1)[0];
  const previousState = _actor.state;

  console.log(
    "(%+) PROCESS:",
    `(${_actor.name})`,
    `${previousState}`,
    nextMessage,
  );

  try {
    _actor.isBusy = true;
    const { state, data, error } = await _actor.messageHandler(nextMessage, {
      name: _actor.name,
      state: _actor.state,
      data: _actor.data,
    });

    _actor.state = state;
    _actor.data = data;
    _actor.error = error;

    if (!_actor.error) {
      console.log(
        "(%+) STATE:",
        `(${_actor.name})`,
        `${previousState} -> ${_actor.state}`,
        _actor.data,
        _actor.error,
      );
    } else {
      console.error(
        "(%+) STATE:",
        `(${_actor.name})`,
        `${previousState} -> ${_actor.state}`,
        _actor.data,
        _actor.error,
      );
    }
  } catch (e: any) {
    _actor.error = e.toString();
  } finally {
    _actor.isBusy = false;
    await notifyListeners(_actor);
  }
};

//-----------------------------------------------------------------------------------------------------------

const globalTimer = () => {
  actors.forEach(async (actor) => {
    await processNextMessage(actor);
  });
  setTimeout(globalTimer, 100); // Adjust the interval as needed
};

// Start the global timer
globalTimer();

//-----------------------------------------------------------------------------------------------------------

// Add a listener for an actor
export const listenTo = (
  actorName: string,
  listener: (actor: Actor) => void,
) => {
  if (!listeners.has(actorName)) {
    listeners.set(actorName, new Set());
  }
  listeners.get(actorName)?.add(listener);
  if (actors.get(actorName)) listener(actors.get(actorName)!);
};

//-----------------------------------------------------------------------------------------------------------

// Remove a listener for an actor
export const stopListeningTo = (
  actorName: string,
  listener: (actor: Actor) => void,
) => {
  listeners.get(actorName)?.delete(listener);
  if (listeners.get(actorName)?.size === 0) {
    listeners.delete(actorName);
  }
};

//-----------------------------------------------------------------------------------------------------------

// Notify all listeners of a given actor
const notifyListeners = async (actor: Actor) => {
  const actorListeners = listeners.get(actor.name);
  if (actorListeners) {
    for (const listener of actorListeners) {
      listener(actor);
    }
  }

  // Notify global listeners
  for (const listener of globalListeners) {
    listener(actor);
  }
};

//-----------------------------------------------------------------------------------------------------------

// Add a global listener for all actors
export const listenToAll = (listener: (actor: Actor) => void) => {
  globalListeners.add(listener);
  // Notify the listener of all current actors immediately
  for (const actor of actors.values()) {
    listener(actor);
  }
};

//-----------------------------------------------------------------------------------------------------------

// Remove a global listener for all actors
export const stopListeningToAll = (listener: (actor: Actor) => void) => {
  globalListeners.delete(listener);
};

//-----------------------------------------------------------------------------------------------------------

// Export actor data without meta data
export const exportActorData = () => {
  const exportedData: { [key: string]: Actor } = {};
  for (const [name, actor] of actors) {
    const { queue, isBusy, messageHandler, ...actorData } = actor;
    exportedData[name] = actorData;
  }
  return exportedData;
};

//-----------------------------------------------------------------------------------------------------------

export const recoverActorFromWIP = (
  actor: Actor & ActorMeta,
  errorMessage: string,
) => {
  if (actor.state.endsWith("-wip")) {
    console.log(
      `(%+) RECOVERING ACTOR ${actor.name} FROM WIP STATE ${actor.state}`,
    );
    sendMessage({
      name: `${actor.state.split("-wip")[0]}-${MessageResult.Failure}`,
      payload: errorMessage,
      to: actor.name,
    });
  }
};

//-----------------------------------------------------------------------------------------------------------

export const recoverAllActorsFromWIP = (errorMessage: string = "Timed out") => {
  for (const actor of actors.values()) {
    recoverActorFromWIP(actor, errorMessage);
  }
};

//-----------------------------------------------------------------------------------------------------------

export const setSystemId = (id: string) => (systemId = id);

export const getSystemId = () => systemId;

//-----------------------------------------------------------------------------------------------------------
