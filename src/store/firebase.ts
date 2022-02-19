import {initializeApp} from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
    getFirestore,
    getDoc,
    doc,
    setDoc,
    getDocs,
    collection,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import {setStore, getStore} from "./store";
import router from "@/router";
//,removeStore,clearStore
//import { async } from "@firebase/util";

console.log(process.env);
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const fbSetUserProfile = async ({
                                           company
                                       }: {
    company: string;
}) => {
    const user = auth.currentUser;
    if (user) {
        console.log(user);
        const users = doc(db, 'users', user.uid);
        await setDoc(
            users,
            {
                company,
                active: false,
                admin: false,
                notification: false,
                uid: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            },
            {merge: true}
        );
        return true;
    }

};

/**
 *
 * @returns
 */

export const fbGetUserProfile = async () => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
        const users = doc(db, "users", user.uid);
        const docSnap = await getDoc(users);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return {
                ...docSnap.data(),
                uid: user.uid,
            };
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!", user.uid);
            return null;
        }
    }

};

export const fbSetApproveToUser = async (uid: string) => {
    if (uid) {
        const user = doc(db, 'users', uid);
        await setDoc(
            user,
            {
                active: true,
                updatedAt: serverTimestamp()
            },
            {merge: true}
        );
        return true;
    }

};
/**
 *
 * @param email
 * @param password
 * @returns
 */
export const fbCreateAccount = async (
    email: string,
    password: string,
    company: string,
) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
    debugger;
    if (response) {
        await fbSetUserProfile({company});
        const profile = await fbGetUserProfile();
        //setStore('user',response.user)
        //setStore('profile',profile)
        return {
            user: response.user,
            profile,
        };
    } else {
        return {
            user: null,
            profile: null,
        };
    }
};


/**
 *
 * @param email
 * @param password
 * @returns
 */
export const fbSignIn = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response;
};

/**
 *
 * @returns
 */
export const fbSignOut = async () => {
    await signOut(auth);
    return true;
};

/**
 *
 * @param callback
 */
export const fbAuthStateListener = (callback: any) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setStore('user', user)
            callback(user);
        } else {
            const storeUser = await getStore('user');
            if (storeUser) {
                callback(storeUser);
            } else {
                // User is signed out
                callback(null);
            }

        }
    });
};


export const queryObjectCollection = async ({
                                                collectionName,
                                            }: {
    collectionName: string;
}) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results: any[] = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        results.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return results;
};

/**
 *
 * @param collectionName
 * @param callback
 */
export const fbCollectionListener = (collectionName: string, callback: any) => {
    onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
            // ...
            console.log("Listening To Collection: " + collectionName, snapshot);
            const results: any[] = [];
            snapshot.forEach((doc) => {
                console.log(doc)
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(results);
        },
        (error) => {
            // ...
            console.log("Error Listening To Collection: " + collectionName, error);
        }
    );
};

export const fbGetAllInActiveComUsers = (collectionName: string, callback: any) => {

    onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
            console.log("Listening To Collection: " + collectionName, snapshot);
            const results: any[] = [];
            snapshot.forEach((doc) => {
                console.log(doc)
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(results);
        },
        (error) => {
            // ...
            console.log("Error Listening To Collection: " + collectionName, error);
        }
    );

}
export const fbGetAllActiveComUsers = (collectionName: string, callback: any) => {
    onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
            console.log("Listening To Collection: " + collectionName, snapshot);
            const results: any[] = [];
            snapshot.forEach((doc) => {
                console.log(doc)
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            callback(results);
        },
        (error) => {
            // ...
            console.log("Error Listening To Collection: " + collectionName, error);
        }
    );

}
export const fbCreateProduct = async (
    userId: string,
    name: string,
    description: string,
    quantity: number
) => {
    const admin = auth.currentUser;
    if (admin) {
        const productRef = doc(db, "users", userId);
        await updateDoc(productRef, {
            items: arrayUnion({
                name: name,
                description: description,
                quantity: quantity,
                createdBy: admin.uid,
                active: false,
                id: new Date().getTime()
            })
        });
        return true;
    }
};
export const fbGetUserDetail = async (
    userId: string
) => {

    if (userId) {
        const users = doc(db, "users", userId);
        const docSnap = await getDoc(users);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return {
                ...docSnap.data(),
                uid: userId,
            };
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!", userId);
            return null;
        }
    }
};
/**
 *
 * @param userId
 * @param itemObj
 * @returns
 */
export const fbDeleteItem = async (
    userId: string,
    itemObj: string | any
) => {
    const productRef = doc(db, "users", userId);
    await updateDoc(productRef, {
        item: arrayRemove(itemObj)
    });
    return true;
};
export const fbSentMessage = async (message: string) => {
    const user = auth.currentUser
    const servertime = serverTimestamp();
    if (user) {
        const chatRef = doc(db, "messages", user.uid);
        const docSnap = await getDoc(chatRef);
        if (!docSnap.exists()) {
            await setDoc(
                chatRef,
                {
                    id: user.uid,
                    createdAt: servertime,
                },
                {merge: true}
            );
        }
        await updateDoc(chatRef, {
            chat: arrayUnion({
                message: message,
                createdBy: user.uid,
                id: new Date().getTime(),
            })
        });
        return true;
    }
};
export const fbAdminSentMessage = async (message: string, user: string) => {
    const adminuser = auth.currentUser
    const servertime = serverTimestamp();
    if (user && adminuser) {
        const chatRef = doc(db, "messages", user);
        const docSnap = await getDoc(chatRef);
        if (!docSnap.exists()) {
            await setDoc(
                chatRef,
                {
                    id: user,
                    createdAt: servertime,
                },
                {merge: true}
            );
        }
        await updateDoc(chatRef, {
            chat: arrayUnion({
                message: message,
                createdBy: adminuser.uid,
                id: new Date().getTime(),
            })
        });
        return true;
    }
};
export const fbGetMessage = async () => {
    const user = auth.currentUser;
    if (user) {
        return onSnapshot(doc(db, "messages", user.uid), (doc) => {
            return doc.data()
        })
    }
};

export {app, db, auth};
