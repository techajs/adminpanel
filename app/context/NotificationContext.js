"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onMessageListener, requestPermission } from "../_lib/messaging";
import AutoSessionUpdate from "../_lib/autoUpdateSession";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [token,setToken]=useState("")

  useEffect(() => {
    requestPermission(setToken);
    onMessageListener().then((payload) => {
      console.log("Received Notification:", payload);
      setNotification(payload.notification);
    });
  }, []);
  
  return (
    <NotificationContext.Provider value={{ notification }}>
      {token && <AutoSessionUpdate token={token} />}

      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {return useContext(NotificationContext);}
