import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthSession, AuthUser, NotificationQueue } from "./types";

// ----------------------------------------------------------------------------

export const useSocket = (serverUrl: string) => {
  const [socket] = useState(() => io(serverUrl));
  const [allNotifications, setAllNotifications] = useState<
    Array<NotificationQueue>
  >([]);

  useEffect(() => {
    socket.on("allNotifications", (data) => {
      setAllNotifications(data?.notifications);
      console.log("all notifications data", data);
    });

    // Listen for connection event
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Listen for disconnect event
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("allNotifications");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [socket]);

  // Function to emit an event to the server
  const sendRequestToLoadNotifications = (
    userId: string,
    sessionId: string,
  ) => {
    const authUser: AuthUser = {
      id: userId,
      fullName: "",
    };
    const authSession: AuthSession = {
      id: sessionId,
      startTime: new Date(),
      lastActivityTime: new Date(),
      userId,
    };

    socket.emit("loadNotifications", {
      authUser,
      authSession,
      filter: "",
      sort: "",
      pageNumber: 1,
      pageSize: 10,
    });
  };

  const getAllNotifications = () => {
    return allNotifications;
  };

  return {
    allNotifications,
    sendRequestToLoadNotifications,
    getAllNotifications,
  };
};

// ----------------------------------------------------------------------------

export const useNotificationsQueue = (
  allNotifications: NotificationQueue[],
  dismissedNotifications: Set<string>,
) => {
  const [notificationsQueue, setNotificationsQueue] = useState<
    NotificationQueue[]
  >([]);
  const [currentItem, setCurrentItem] = useState<NotificationQueue | null>(
    null,
  );

  useEffect(() => {
    if (allNotifications) {
      setNotificationsQueue((prevQueue) => {
        const existingIds = new Set(
          prevQueue.map((notification) => notification.id),
        );
        console.log("existingIds", existingIds);

        const newNotifications = allNotifications.filter(
          (notification: NotificationQueue) =>
            !existingIds.has(notification.id) &&
            !dismissedNotifications.has(notification.id),
        );
        console.log("newNotifications", newNotifications);

        if (newNotifications.length === 0) return prevQueue;

        const updatedQueue = [...prevQueue, ...newNotifications];

        if (!currentItem) {
          setCurrentItem(updatedQueue[0] || null);
        }

        return updatedQueue;
      });
    }
  }, [allNotifications, dismissedNotifications]);

  return {
    notificationsQueue,
    currentItem,
    setNotificationsQueue,
    setCurrentItem,
  };
};

// ----------------------------------------------------------------------------
