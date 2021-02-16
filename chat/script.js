var firebaseConfig = {
    apiKey: "AIzaSyD4l8o10GZ6kfDZacvXEsvALsNoL76tjGE",
    authDomain: "chat-45fe7.firebaseapp.com",
    databaseURL: "https://chat-45fe7.firebaseio.com",
    projectId: "chat-45fe7",
    storageBucket: "chat-45fe7.appspot.com",
    messagingSenderId: "680353539221",
    appId: "1:680353539221:web:a842f89d257892ed49679c"
  };

firebase.initializeApp(firebaseConfig);

const msgScreen = document.getElementById("messages"); //the <ul> that displays all the <li> msgs
const msgForm = document.getElementById("messageForm"); //the input form
const msgInput = document.getElementById("msg-input"); //the input element to write messages
const msgBtn = document.getElementById("msg-btn"); //the Send button

var provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();
const msgRef = db.ref("/msgs"); 


//to store data in the msgs folder by creating a reference in database

//let name="Marc";

var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5500/chat/chat.html',
    // This must be true.
    handleCodeInApp: true,
    /*iOS: {
      bundleId: 'com.example.ios'
    //},
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },*/
    //dynamicLinkDomain: 'example.page.link'
  };

function init() {
  //firebase.auth().signInWithRedirect(provider);
  //name = "Marc";
  /*firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  //var token = result.credential.accessToken;
  // The signed-in user info.
  //var user = result.user;
  // ...
  //console.log(result);
  const msg = {
          dataName: "Mar",
          text: "und"
      };
  
      msgRef.push(msg);
  msgRef.on('child_added', updateMsgs); */
/* }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log("Fehler");
  msgRef.on('child_added', updateMsgs);
}); */
   // const name = prompt("Please enter your name");
   // msgRef.on('child_added', updateMsgs);
   // Confirm the link is a sign-in with email link.
   //let email = "marc.bertram@gmail.com"
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  //console.log(email);
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is marc.bnew or existing:
      // result.additionalUserInfo.isNewUser
      console.log(result);
      window.localStorage.setItem('username', prompt("Please enter your Username"));
      msgRef.on('child_added', updateMsgs);
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}}

function link() {
   const email = prompt("Please enter your Email");
   firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    console.log("link internal")
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}


const updateMsgs = data =>{
    const username = window.localStorage.getItem('username')
    console.log(data.val());
    const {dataName, text} = data.val(); //get name and text
    console.log(dataName)
    //load messages, display on left if not the user's name. Display on right if it is the user.
    const msg = `<div class="${dataName == username ? "msg my": "msg"}">
      <span class = "name">${dataName}: </span>${text}
    </div>`
  
    msgScreen.innerHTML += msg; //add the <li> message to the chat window
  
    //auto scroll to bottom
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  }

function sendMessage(e){
    e.preventDefault();
    const text = msgInput.value;
    const username = window.localStorage.getItem('username');
  
      if(!text.trim()) return alert('Please type a message'); //no msg submitted
      const msg = {
          dataName: username,
          text: text
      };
  
      msgRef.push(msg);
      msgInput.value = "";
  }  

if(!window.localStorage.getItem('emailForSignIn')) {
  console.log("link")
  document.addEventListener('DOMContentLoaded',link);
}
else {
  document.addEventListener('DOMContentLoaded', init);
}


msgForm.addEventListener('submit', sendMessage);

