importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyBeSSVr3hUfZG-iw9KPcwNrU9glC1HbGj8",
    authDomain: "news-jasoos-9f1ca.firebaseapp.com",
    projectId: "news-jasoos-9f1ca",
    storageBucket: "news-jasoos-9f1ca.appspot.com",
    messagingSenderId: "547077538785",
    appId: "1:547077538785:web:fdcbf419358698390fc8a0",
    measurementId: "G-BV95E103KG"   
});

const messaging = firebase.messaging();