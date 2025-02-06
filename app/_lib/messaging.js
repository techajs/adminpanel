import { messaging, getToken, onMessage,isSupported } from "./firebase";

export const requestPermission = async () => {
    if (!messaging) return;
    try {
       
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, 
        });
        // console.log("FCM Token:", token);
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
}

export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Received foreground message:", payload);
    callback(payload)
  });
}
