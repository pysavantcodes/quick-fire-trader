import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { useRef } from "react";

// const firebaseConfig = {
//     apiKey: process.env.React_App_ApiKey,
//     authDomain: process.env.React_App_AuthDomain,
//     projectId: process.env.React_App_ProjectId,
//     storageBucket: process.env.React_App_StorageBucket,
//     messagingSenderId: process.env.React_App_MessagingSenderId,
//     appId: process.env.React_App_AppId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBEyedgGW8F4JuG0HxIf9GOCOHONOGtc0k",
    authDomain: "quickfire-traders.firebaseapp.com",
    projectId: "quickfire-traders",
    storageBucket: "quickfire-traders.appspot.com",
    messagingSenderId: "645366099562",
    appId: "1:645366099562:web:b8c358b7ed472241926413",
    measurementId: "G-4J1VTRLLCJ"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

export const createUserDocument = async(user, additionalData) => {
    if (!user) return;
    const userRef = fire.firestore().doc(`users/${user.uid}`)

    const snapshot = await userRef.get()

    if (!snapshot.exists) {
        const { email } = user;
        const { displayName } = additionalData;

        try {
            userRef.set({
                displayName,
                email,
                createdAt: new Date()
            })
            console.log("Created");
        } catch (error) {
            console.log("Unable to create user", error);
        }
    }
}