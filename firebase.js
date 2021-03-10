// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD5J1nVGlHO03eJaZvNUf4VEFoVhjyfX04",
  authDomain: "virtual-brain-302111.firebaseapp.com",
  databaseURL: "https://virtual-brain-302111-default-rtdb.firebaseio.com",
  projectId: "virtual-brain-302111",
  storageBucket: "virtual-brain-302111.appspot.com",
  messagingSenderId: "365443861236",
  appId: "1:365443861236:web:6679b94f4f500182cfeca1",
  measurementId: "G-MFWDCGLZJH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == "fetchNotes") {
    //Processing the Request then after listening to the request
    firebase
      .database()
      .ref("/notes")
      .once("value")
      .then(function (snapshot) {
        response({
          type: "result",
          status: "success",
          data: snapshot.val(),
          request: msg,
        });
      });
  }
  return true;
});
//Listening for different Kind of message Events to and from the Extenstion to the Database :
