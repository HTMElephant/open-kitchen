// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpijRXF2DJhMT3j_ErkBfqGZBTeM28mqw",
  authDomain: "open-kitchen-b1d3a.firebaseapp.com",
  projectId: "open-kitchen-b1d3a",
  storageBucket: "open-kitchen-b1d3a.appspot.com",
  messagingSenderId: "357983265740",
  appId: "1:357983265740:web:0969b678311190d0de3369",
  measurementId: "G-1B4NQS6XEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
