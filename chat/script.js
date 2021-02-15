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

let name="";
function init() {
  //firebase.auth().signInWithRedirect(provider);
  name = "Marc";
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  console.log(result);
  const msg = {
          dataName: "Mar",
          text: "und"
      };
  
      msgRef.push(msg);
  msgRef.on('child_added', updateMsgs);
}).catch(function(error) {
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
});
  //name = prompt("Please enter your name");
//  msgRef.on('child_added', updateMsgs);
}

const updateMsgs = data =>{
    console.log(data.val());
    const {dataName, text} = data.val(); //get name and text
    console.log(dataName)
    //load messages, display on left if not the user's name. Display on right if it is the user.
    const msg = `<div class="${dataName == name ? "msg my": "msg"}">
      <span class = "name">${dataName}: </span>${text}
    </div>`
  
    msgScreen.innerHTML += msg; //add the <li> message to the chat window
  
    //auto scroll to bottom
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  }

function sendMessage(e){
    e.preventDefault();
    const text = msgInput.value;
  
      if(!text.trim()) return alert('Please type a message'); //no msg submitted
      const msg = {
          dataName: name,
          text: text
      };
  
      msgRef.push(msg);
      msgInput.value = "";
  }  
document.addEventListener('DOMContentLoaded', init);

msgForm.addEventListener('submit', sendMessage);

