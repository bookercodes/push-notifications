import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA1N38AJhGYFKM0eQkrtRfsnPWcUj9bRNQ",
  authDomain: "pn-reactjs-testing.firebaseapp.com",
  databaseURL: "https://pn-reactjs-testing.firebaseio.com",
  projectId: "pn-reactjs-testing",
  storageBucket: "",
  messagingSenderId: "799269004293",
  appId: "1:799269004293:web:3c0fd4b46d6cba22"
};

const init = firebase.initializeApp(config);

const messaging = init.messaging();
messaging
  .requestPermission()
  .then(() => {
    console.log('Have Permission');
    return messaging.getToken();
  })
  .then(token => {
    console.log('FCM Token:', token);
    var userType = 'group';
    var UID = process.env.REACT_APP_COMETCHAT_GUID;
    var appId = process.env.REACT_APP_COMETCHAT_APP_ID;

    var topic = appId + '_' + userType + '_' + UID;

    var url =
      'https://ext-push-notifications.cometchat.com/fcmtokens/' +
      token +
      '/topics/' +
      topic;

    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({appId: appId}),
    })
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          console.log(
            'Error subscribing to topic: ' +
              response.status +
              ' - ' +
              response.text()
          );
        }

        console.log('Subscribed to "' + topic + '"');
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    if (error.code === 'messaging/permission-blocked') {
      console.log('Please Unblock Notification Request Manually');
    } else {
      console.log('Error Occurred', error);
    }
  });

messaging.onMessage(function(payload) {
  console.log('Receiving foreground message', JSON.parse(payload.data.message));
  // Customize notification here
  var sender = JSON.parse(payload.data.message);
  var notificationTitle = 'New CometChat message';
  var notificationOptions = {
    body: payload.data.alert,
    icon: sender.data.entities.sender.avatar,
  };

  var notification = new Notification(
    notificationTitle,
    notificationOptions
  );

  notification.onclick = function(event) {
    notification.close();
    //handle click event onClick on Web Push Notification
  };
});