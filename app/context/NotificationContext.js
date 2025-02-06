"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onMessageListener, requestPermission } from "../_lib/messaging";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    requestPermission();
    onMessageListener((payload) => {
      setNotification(payload.notification);
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {return useContext(NotificationContext);}
