// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getDatabase, 
  ref,
  set,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOKiMd2yz2HKUISqob-eS3Q2y4xnv8URM",
  authDomain: "threadz-app-27986.firebaseapp.com",
  projectId: "threadz-app-27986",
  storageBucket: "threadz-app-27986.appspot.com",
  messagingSenderId: "37956400443",
  appId: "1:37956400443:web:0a90dbb81b5dd11043f31e",
  measurementId: "G-RY5501HFEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

let register_btn = document.getElementById("register_btn");

register_btn.addEventListener("click", function(){
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    set(ref(db,`users/${user.uid}`),{
      email: email.value,
      password: password.value,
    });

   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("error=>", errorMessage)
    // ..
  });

})

let login_btn = document.getElementById("login_btn");

login_btn.addEventListener("click", function(){
  let login_email = document.getElementById("login_email");
  let login_password = document.getElementById("login_password");

  signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    onValue(ref(db,`users/${user.uid}`), (data) => {
      console.log("data==>", data.val());
    });

    get(ref(db,`users/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error=>", errorMessage);
  });
});