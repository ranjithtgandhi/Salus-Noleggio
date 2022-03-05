import { initializeApp } from "firebase/app";
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
  arrayRemove,
  deleteField
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setStore, getStore } from "./store";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
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
      { merge: true }
    );
    return true;
  }

};
export const fbSetNotification = async (
  note: boolean
) => {
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    const users = doc(db, 'users', user.uid);
    await setDoc(
      users,
      {
        notification: note,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
    return true;
  }

};
export const fbSetUserStatus = async (status: boolean, userId: any) => {

  //const user = auth.currentUser;
  if (userId) {
    //console.log(user);
    const users = doc(db, 'users', userId);
    await setDoc(
      users,
      {
        uid: userId,
        active: status,
        updatedAt: serverTimestamp()
      },
      { merge: true }
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
export const fbForgotPassword = async (email: string) => {
  const response = await sendPasswordResetEmail(auth, email);
  console.log(response);
  return response;
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
      { merge: true }
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
  company: string
) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  console.log(response); //debugger;
  if (response) {
    await fbSetUserProfile({ company });
    //const profile = await fbGetUserProfile();
    /* return {
      user: response.user,
      profile,
    }; */
    return true;
  } else {
    return false
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
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return results;
  } else {
    return false;
  }

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
  name: string,
  description: string,
  //quantity: number
) => {//userId: string,
  const user = auth.currentUser;
  if (user) {
    const productRef = doc(db, "items", user.uid);
    const docSnap = await getDoc(productRef);
    if (!docSnap.exists()) {
      await setDoc(productRef,{
        items: arrayUnion({
          name: name,
          description: description,
          createdBy: user.uid,
          id: new Date().getTime(),
        })
      },{ merge: true })
      return true;
    }
    await updateDoc(productRef, {
      items: arrayUnion({
        name: name,
        description: description,
        createdBy: user.uid,
        id: new Date().getTime(),
        // quantity: quantity,
      })
    });
    return true;
  }
};
export const fbGetUserRequestedProducts = async (userId?: string) => {
  if (userId) {
    const users = doc(db, "requests", userId);
    const docSnap = await getDoc(users);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return {
        ...docSnap.data()
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!", userId);
      return null;
    }
  }
};
export const fgUserProRequestToAdmin = async (obj: any, date: any,profile: any) => {
  const user = auth.currentUser
  if (user) {
    const users = doc(db, "requests", user.uid);
    const d = new Date();
    const docSnap = await getDoc(users);
    if (!docSnap.exists()) {
      await setDoc(
        users,
        {
          items: arrayUnion({
            deliveryDate: date,
            createdAt: d.getTime(),
            updatedAt: d.getTime(),
            status: 0,
            statusMessage: 'pending',
            id: d.getTime(),
            userId: user.uid,
            company:profile.company, 
            products: obj
          })
        },
        { merge: true }
      );
      return true;
    }
    await updateDoc(users, {
      items: arrayUnion({
        deliveryDate: date,
        createdAt: d.getTime(),
        updatedAt: d.getTime(),
        status: 0,
        userId: user.uid,
        company:profile.company, 
        statusMessage: 'pending',
        id: d.getTime(),
        products: obj
      })
    });
    return true;

  }
};
export const fbAdminUpdateUserReqPro = async (userId: any, proObj: any) => {
  if (userId) {
    const users = doc(db, "requests", userId);
    //const d = new Date();
    await getDoc(users);
    await updateDoc(users, {
      items: deleteField(),//https://firebase.google.com/docs/firestore/manage-data/delete-data
    });
    await updateDoc(users, {
      items: proObj
    });
    //posts.filter(post => post.id !== deleteId);
    return true;

  }
};

export const fbGetUserDetail = async ( // for Add Product with user
  userId: any
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
export const fbGetUserProductList = async () => {
  const user = auth.currentUser;
  if (user) {
    const users = doc(db, "users", user.uid);
    const docSnap = await getDoc(users);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());//debugger;
      return {
        ...docSnap.data(),
        uid: user.uid,
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!", user.uid);
      return { items: [] };
    }
  }
};
export const fbGetProductList = async () => {
  const user = auth.currentUser;
  if (user) {
    const users = doc(db, "items", user.uid);
    const docSnap = await getDoc(users);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());//debugger;
      return {
        ...docSnap.data(),
        uid: user.uid,
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!", user.uid);
      return { items: [] };
    }
  }
};
/**
 *
 * @param userId
 * @param itemObj
 * @returns
 */
export const fbUserAddProForNewReq = async (obj: string | any) => {
  const user = auth.currentUser;
  if (user) {
    const users = doc(db, "users", user.uid);
    const docSnap = await getDoc(users);
    if (!docSnap.exists()) {
      await setDoc(users,{
        items: arrayUnion(...obj)
      },{ merge: true })
      return true;
    }
    await updateDoc(users, {
      items: arrayUnion(...obj)
    });
    return true;
  }

};

export const fbAddItemToUser = async (
  userId: string, itemObj: string | any, quantity: number | any
) => {
  const productRef = doc(db, "users", userId);
  if (productRef) {
    const docSnap = await getDoc(productRef);
    if (!docSnap.exists()) {
      await setDoc(productRef,{
        items: arrayUnion({
          name: itemObj.name,
          description: itemObj.description,
          qty: quantity,
          proId: itemObj.id,
          id: new Date().getTime()
        })
      },{ merge: true });
      return true;
    }
    await updateDoc(productRef, {
      items: arrayUnion({
        name: itemObj.name,
        description: itemObj.description,
        qty: quantity,
        proId: itemObj.id,
        id: new Date().getTime()
      })
    });
    return true;
  }
  return false;

};

export const fbDeleteItemFromUser = async (
  userId: string,
  itemObj: string | any
) => {
  const productRef = doc(db, "users", userId);
  await updateDoc(productRef, {
    items: arrayRemove(itemObj)
  });
  return true;
};
export const fbDeleteAdminItem = async (
  userId: string,
  itemObj: string | any
) => {
  const productRef = doc(db, "items", userId);
  await updateDoc(productRef, {
    items: arrayRemove(itemObj)
  });
  return true;
};
/**
 *
 * @param file
 */
export const fbProductFileUpload = async (
  file: any,
  userId: any
) => {
  console.log(file)
  const filename = file.name;
  const extension = filename.split('.').pop();
  const storage = getStorage();
  const storageRef = ref(storage, `Docs/${userId}/${new Date().getTime()}.${extension}`);
  // 'file' comes from the Blob or File API
  const res = await uploadBytes(storageRef, file).then(() => {//snapshot
    console.log('Uploaded a blob or file!');
    return true;
  }, error => {
    console.error('onRejected function called: ' + error.message);
    return false;
  });
  return res;
  //Download
  /* snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log("File available at", downloadURL);
  }); */
};
export const fbGetAllProDocFiles = async (
  userId: any
) => {
  const storage = getStorage();
  const listRef = ref(storage, `Docs/${userId}`);

  const res = await listAll(listRef)
    .then((list) => {
      //debugger
      const proDocFiles: any = [];
      const items = list.items;

      const promises = items.map(async (item: any) => {
        const getUrl =  await getDownloadURL(ref(storage, `${item["_location"]["path_"]}`))
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();
              console.log(url);
              return url
            })
            .catch((error) => {
              return error.message;
            });
            return getUrl;
      })
      const getAllProDocFiles= Promise.all(promises);
      console.log(getAllProDocFiles);
      return getAllProDocFiles;
      //https://firebase.google.com/docs/storage/web/download-files
      /* if(items){
        for (const item of items) {
          const getUrl =  getDownloadURL(ref(storage, `${item["_location"]["path_"]}`))
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();
              console.log(url);
              proDocFiles.push(url);
              if(items.length==)
              return url
            })
            .catch((error) => {
              return error.message;
            });
        }
        return proDocFiles;
        
      } */
      
      
      /* list.items.forEach(async (item: any) => {
        debugger;
        const getUrl = await getDownloadURL(ref(storage, `${item["_location"]["path_"]}`))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            console.log(url);
            return url
          })
          .catch((error) => {
            return error.message;
          });
        proDocFiles.push(getUrl);
        
      }); */
      
    }).catch((error) => {
      console.error('onRejected function called: ' + error.message);
      return false;
    });

  return res;
  //Download
  /* snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log("File available at", downloadURL);
  }); */
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
        { merge: true }
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
        { merge: true }
      );
      return true;
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

export { app, db, auth };
