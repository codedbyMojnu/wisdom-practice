import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
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

// Save wisdom data for a user
export async function saveWisdomDataToFireStore(userId, wisdomData) {
    try {
        const docRef = doc(db, "wisdomsData", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Append wisdom without overwriting old data
            await updateDoc(docRef, {
                wisdoms: arrayUnion(wisdomData)
            });
            console.log("Wisdom updated successfully");
            return true;
        } else {
            // Create new doc with first wisdom entry
            await setDoc(docRef, {
                userId,
                wisdoms: [wisdomData]
            });
            console.log("Wisdom added successfully");
            return true;
        }
    } catch (error) {
        console.error("Error saving wisdom:", error.message);
        return false;
    }
}

// Get wisdom data for a user
export async function getWisdomData(userId) {
    try {
        const docSnap = await getDoc(doc(db, "wisdomsData", userId));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error getting wisdom:", error.message);
        return null;
    }
}


// Save or update daily wisdom logs
// Save or update daily wisdom logs
export async function saveDailyWisdom(today, randomId, uid, wisdomLog) {
    const userDocRef = doc(db, "wisdomLogs", uid);
    const wisdomLogsData = await getDoc(userDocRef);

    // First time user
    if (!wisdomLogsData.exists()) {
        try {
            await setDoc(userDocRef, {
                uid,
                dailyBasisWisdomLogs: {
                    [today]: {
                        id: randomId,
                        wisdoms: [wisdomLog]
                    }
                }
            });
            toast("New User Wisdom Added")
            return "firstLog";
        } catch (error) {
            console.log(error.message)
        }


    }

    // Today Date Exist
    const data = wisdomLogsData.data();
    const todayExist = data.dailyBasisWisdomLogs?.[today];

    if (todayExist) {

        try {
            await updateDoc(userDocRef, {
                [`dailyBasisWisdomLogs.${today}.wisdoms`]: arrayUnion(wisdomLog)
            });
            toast("Today's Wisdom Added")
            return "todayDayExist";

        } catch (error) {
            console.log(error.messaage);
        }
    }

    // New day log
    if (!todayExist) {
        try {
            await updateDoc(userDocRef, {
                [`dailyBasisWisdomLogs.${today}`]: {
                    id: randomId,
                    wisdoms: [wisdomLog]
                }
            });
            toast("New Day Wisdom Added");
            return "newDayLog";

        } catch (error) {
            console.log(error.message);
        }
    }
}


export async function getWisdomLogsFromDB(uid) {
    const response = await getDoc(doc(db, "wisdomLogs", uid));

    if (response.exists()) {
        return response.data();
    } else {
        return null; // অথবা {}
    }
}





