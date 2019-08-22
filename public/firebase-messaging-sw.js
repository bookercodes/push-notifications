importScripts('https://www.gstatic.com/firebasejs/6.4.0/firebase.js');

var config = {
  apiKey: "AIzaSyA1N38AJhGYFKM0eQkrtRfsnPWcUj9bRNQ",
  authDomain: "pn-reactjs-testing.firebaseapp.com",
  databaseURL: "https://pn-reactjs-testing.firebaseio.com",
  projectId: "pn-reactjs-testing",
  storageBucket: "",
  messagingSenderId: "799269004293",
  appId: "1:799269004293:web:3c0fd4b46d6cba22"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

//background
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(' Received background message ', payload);

  // Customize notification here
  var notificationTitle = 'New CometChat message';
  var notificationOptions = {
    body: payload.data.alert,
    icon: payload.data.entities.sender.entity.avatar,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// [END background_handler]
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  //handle click event onClick on Web Push Notification
});
