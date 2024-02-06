import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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
const auth = getAuth(firebaseApp);
// Get a reference to the database service
const database = getDatabase(firebaseApp);

let HomePage = document.querySelector(".HomePage")
let LoginPage = document.querySelector(".LoginPage")

LogInBtn.addEventListener("click", async function (e) {
	e.preventDefault();
	const mobileNumber = document.getElementById("LoginMobileNumber").value + "@gmail.com";
	const password = document.getElementById("LoginPassword").value;

	try {
	const userCredential = await signInWithEmailAndPassword(auth, "Admin"+mobileNumber, password);
	const user = userCredential.user;
	console.log("Success! Welcome back!");
	alert("Login Successfully ! Welcome back!");
	localStorage.setItem("UserMobile", mobileNumber.replace("@gmail.com", ""))
	LoginPage.style.display = "none";
	HomePage.style.display = "block"
	} catch (error) {
	console.log(error);

  if(error.code == "auth/invalid-email"){
    alert("Please Check Your Mobile Number")
  }

  if(error.code == "auth/missing-password"){
    alert("Wrong Password:- Please Check Your Password")
  }

  if(error.code == "auth/invalid-login-credentials"){
    alert("Mobile Number Not Registred Please Create a New Account")
  }

	}
	});


let MessageBox = document.querySelector("#MessageBox")
let Num = 1

onValue(ref(database, "Contact"), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let MessageData = childSnapshot.val();
      let Key = childSnapshot.key

      let Name = MessageData.Name;
      let Mobile =  MessageData.Mobile;
      let Email = MessageData.Email;
      let Subject = MessageData.Subject;
      let Message = MessageData.Massage;

      let MessageBoxItem = `
      <tr>
      <th scope="row">${Num}</th>
    <td scope="col">${Name}</td>
      <td scope="col">${Mobile}</td>
      <td scope="col">${Email}</td>
      <td scope="col">${Subject}</td>
      <td scope="col">${Message}</td>
      <td scope="col">
          <a href="https://wa.me/${Mobile}?text=I'm%20Developer%20Pankaj%20How%20can%20i%20help%20you" class="btn btn-success">Message</a>
          <a href="tel:${Mobile}" class="btn btn-primary my-2">Call</a>
          <button class="btn btn-danger my-2 delBtn" data-key="${Key}">Delete</button>
      </td>

    </tr>
      `
  
      MessageBox.innerHTML += MessageBoxItem;
Num++;

    });
  })



  // Event delegation for delete buttons
MessageBox.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBtn')) {
        const documentIdToDelete = event.target.getAttribute("data-key");
        if (documentIdToDelete) {
            const documentRefToDelete = ref(database, `Contact/${documentIdToDelete}`);
            MessageDelete(documentRefToDelete);
        }
    }
});

// Function to delete user from owner
async function MessageDelete(docRef) {
    try {
        await remove(docRef);
        alert("Successfully deleted!");
    } catch (error) {
        console.error(error);
        console.log(error);
    }
}