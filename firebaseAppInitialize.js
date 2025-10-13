// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Validate required env variables for a robust, production-ready setup
function validateEnv() {
  const required = [
    "VITE_API_KEY",
    "VITE_AUTH_DOMAIN",
    "VITE_PROJECT_ID",
    "VITE_STORAGE_BUCKET",
    "VITE_MESSAGING_SENDER_ID",
    "VITE_APP_ID",
  ];
  const missing = required.filter((k) => !import.meta.env[k]);
  if (missing.length > 0) {
    const msg = `Missing Firebase env variables: ${missing.join(", ")}`;
    if (import.meta.env.MODE !== "production") {
      // In dev, throw early to surface misconfiguration
      throw new Error(msg);
    } else {
      // In prod, log an error to avoid crashing the whole app render path
      console.error(msg);
    }
  }
}

validateEnv();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase once (singleton)
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
