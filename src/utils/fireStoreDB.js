import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseAppInitialize";
const db = getFirestore(app);

// SAVE USER INFO TO FIRESTORE DB

export async function saveUserInfoToFireStore(user) {
    try {
        const checkUserInfoExist = await getUserInfo(user?.uid);
        if (!checkUserInfoExist) {
            await setDoc(doc(db, "users", user.uid), {
                email: user?.email || "",
                displayName: user?.displayName || "",
                emailVerified: user?.emailVerified || false,
                photoURL: user?.photoURL || "",
                uid: user?.uid || "",
                about: "",
            })
            console.log("Save Data to FireStore Successfully");
        } else {
            console.log("This user profile data already added");
        }

    }
    catch (error) {
        console.log(error.message);
    }

}

// GET USER INFO FOR SPECIFIC USER FROM FIRESTORE DATABASE

export async function getUserInfo(uid) {
    const response = await getDoc(doc(db, "users", uid));
    console.log(response.data() || "New User: So Profile Data Not Found");
    return response.data();
}

// UPDATE USER INFO

export async function updateUserInfo(uid, updatedUserData) {
    try {
        await updateDoc(doc(db, "users", uid), updatedUserData);
        console.log("Updated UserInfo to FireStore Successfully");
        return true;
    } catch (error) {
        console.log(error.message);
    }

}

// SAVE WISDOM DATA TO FIRESTORE DB

export async function saveWisdomDataToFireStore(uid, wisdomData) {
    try {
        await setDoc(doc(db, "wisdomsData", uid), wisdomData);
        console.log("Wisdom Data Saved to FireStore Successfully");
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}



