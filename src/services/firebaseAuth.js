import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth";
import { app } from "../../firebaseAppInitialize";
import { saveUserInfoToFireStore } from "./fireStoreDB";
const auth = getAuth(app);


// REGISTER ACCOUNT WITH EMAIL AND PASSWORD

export async function registerWithEmailPassword(name, email, password) {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if (response?.user) {
            await updateProfile(response.user, { displayName: name });
        }

        await saveUserInfoToFireStore(response?.user);

        return response.user;

    } catch (error) {
        console.log(error.message);
    }
}

// SIGN IN ACCOUNT WITH EMAIL AND PASSWORD
export async function signInWithEmailPassword(email, password) {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        return response?.user;
    } catch (error) {
        console.log(error.message);
    }

}

// SIGN IN WITH GOOGLE PROVIDER

export async function signInWithGoogleAuthProvider() {
    const provider = new GoogleAuthProvider();
    try {

        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        await saveUserInfoToFireStore(user);
        return user;


    } catch (error) {
        console.log(error);
    }
}


//  HANDLE SIGNOUT

export async function handleFirebaseSignout() {
    try {
        await signOut(auth);
        return true;

    }
    catch (error) {
        console.log(error.message);
    }
}


// RESET PASSWORD

export async function handleChangePassword(user, email, currentPassword, newPassword) {
    const credential = EmailAuthProvider.credential(email, currentPassword);
    try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        console.log("Password Update Successfull");
    } catch (error) {
        console.log(error.message);
    }

}