require('dotenv').config();
// Import the functions you need from the SDKs you need
const { initializeApp } = require('https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js');
const { getAnalytics } = require('https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL5wF1F496XT3Aqb_b0LyrhR6jDpF6zd0",
  authDomain: "giftify-894d5.firebaseapp.com",
  projectId: "giftify-894d5",
  storageBucket: "giftify-894d5.appspot.com",
  messagingSenderId: "912339923494",
  appId: "1:912339923494:web:b49c621d82a34476142ce7",
  measurementId: "G-2V5MJCVQLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;