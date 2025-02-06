importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Wait until the firebaseConfig is available
if (typeof window !== "undefined") {
    if (window.firebaseConfig) {
        const firebaseConfig = window.firebaseConfig;
        firebase.initializeApp(firebaseConfig);
      
        const messaging = firebase.messaging();
      
        messaging.onBackgroundMessage(function(payload) {
          console.log('Received background message', payload);
      
          const notificationTitle = payload.notification.title;
          const notificationOptions = {
            body: payload.notification.body,
          };
      
          self.registration.showNotification(notificationTitle, notificationOptions);
        });
      } else {
        console.error('Firebase config not loaded.');
      }
  }

