"use client"
import { getSession} from "next-auth/react";
import { messaging, getToken, onMessage, isSupported } from "./firebase";
import { updateWebToken } from "./action";

export const requestPermission = async (setToken) => {
  if (!messaging) return;
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      const session = await getSession();
      if (session) {
        console.log(session.webToken)
        if (session && session.webToken !== token) {
          let params = {
            email: session?.email,
            webToken: token,
          };
          updateWebToken(
            params,
            (successResponse) => {
              if (successResponse?.user) {
                setToken(token)
              } else {
                console.error("error",successResponse?.error)
              }
            },
            (errorResponse) => {
              console.log("error",errorResponse)
            }
          );
        }
      }
      const supported = await isSupported();
      if (!supported) {
        console.warn("FCM is not supported in this browser.");
      }
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting notification token", error);
  }
};

export const onMessageListener = () =>
new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground Message Received:", payload);
    resolve(payload);
  });
});
