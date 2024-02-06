import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyC381oaIlg4KY-DIrqA70HCApAIRBHc7aM",
    authDomain: "portfolio-46089.firebaseapp.com",
    projectId: "portfolio-46089",
    storageBucket: "portfolio-46089.appspot.com",
    messagingSenderId: "955938866721",
    appId: "1:955938866721:web:14325944e377c906b40560",
    measurementId: "G-26X9HBPMFF"
  };

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebaseApp);

let DataForm = document.querySelector("#contact-form")

// Add submit event listener to form
DataForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission
  let UserName = document.getElementById("contact-name").value;
  let Mobile = document.getElementById("contact-phone").value;
  let Email = document.getElementById("contact-email").value;
  let Subject = document.getElementById("subject").value;
  let Massage = document.getElementById("contact-message").value;


  // Push data to Firebase
  push(ref(database, 'Contact'), {
    Name: UserName,
    Mobile: Mobile,
    Email: Email,
    Subject: Subject,
    Massage: Massage
  }).then(() => {
    console.log('Message Sended');
    alert("Message Sended")
  }).catch((error) => {
    console.error('Error sending data:', error);
  });

});


let darkModeToggle = document.querySelector("#darkModeToggle");
let body = document.querySelector("body")
darkModeToggle.addEventListener("click", function(){
    
    if(body.classList.toggle("white-version")){
        localStorage.setItem("Theme", "white-version")
    }
    if(body.classList.toggle("dark-version")){
        localStorage.setItem("Theme", "dark-version")
    }

})

let Theme = localStorage.getItem("Theme")

window.addEventListener("load", function(){

    
    if(Theme == "white-version"){
    darkModeToggle.innerHTML = "Dark Mode"
}
else{
    darkModeToggle.innerHTML = "Light Mode"
}

body.classList.toggle(Theme)
})