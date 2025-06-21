import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // other configs...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
