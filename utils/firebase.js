import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyBeSSVr3hUfZG-iw9KPcwNrU9glC1HbGj8",
        authDomain: "news-jasoos-9f1ca.firebaseapp.com",
        projectId: "news-jasoos-9f1ca",
        storageBucket: "news-jasoos-9f1ca.appspot.com",
        messagingSenderId: "547077538785",
        appId: "1:547077538785:web:fdcbf419358698390fc8a0",
        measurementId: "G-BV95E103KG"      
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey: "your_web_push_certificate_key_pair",
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
