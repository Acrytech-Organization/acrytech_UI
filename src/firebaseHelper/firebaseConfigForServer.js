// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { DEVELOPMENT_ENV } from "../Helpers/ExtraProperties";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcmK_bxNZNIH4oHi4wcB9S9pQUOvG09CQ",
    authDomain: "khatavani-933a5.firebaseapp.com",
    projectId: "khatavani-933a5",
    storageBucket: "khatavani-933a5.appspot.com",
    messagingSenderId: "531265417973",
    appId: "1:531265417973:web:7a3bcd76ddfddc259ccbbc",
    measurementId: "G-EEFC8K0QN0",
    databaseURL: 'https://khatavani-933a5-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase(app);

if (process.env.NODE_ENV === DEVELOPMENT_ENV && process.env.REACT_APP_ACTUAL_SERVER !== "true") {
    var useEmulater = true;
    //at developement if you want to connect to the online you just need to change the useEMulater to
    //false that will connect you to online and add the .env file  REACT_APP_ACTUAL_SERVER = true  with that
    //variable
    if (useEmulater) {
        connectDatabaseEmulator(database, "localhost", 9000);
        connectAuthEmulator(auth, "http://localhost:9099");
    }
}
