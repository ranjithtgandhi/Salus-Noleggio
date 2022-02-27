import { User as fbUser } from "firebase/auth";
import { defineStore } from "pinia";
import { setStore} from "./store";//, getStore, removeStore, clearStore 
import {
  fbAuthStateListener,
  fbSignIn,
  fbSignOut,
  fbCreateAccount,
  fbGetUserProfile,
  fbGetAllInActiveComUsers,
  fbGetAllActiveComUsers,
  fbSetApproveToUser,
  fbGetUserDetail,
  fbCreateProduct,
  fbSetNotification,
  fbForgotPassword,
  fbSetUserStatus,
  fbSentMessage, fbGetMessage, fbAdminSentMessage,
  //fbCollectionListener,
} from "./firebase";

export interface User {
  user: any;
  profile: any;
  userError: any;
  inActiveCompUsers: any;
  activeCompUsers: any;
  userProductDetails: any;
}

interface State {
  user: fbUser | null;
  profile: any;
  error: any;
  message: any;
  inActiveCompUsers: null;
  activeCompUsers: null;
  userProductDetails: any;
}


export const useAuthStore = defineStore("authStore", {
  // convert to a function
  state: (): State => ({
    user: null,
    profile: null,
    error: null,
    message: null,
    inActiveCompUsers: null,
    activeCompUsers: null,
    userProductDetails: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => (state.profile) ? ((state.profile.admin) ? true : false) : false,
    userError: (state) => state.error,
  },
  actions: {
    /**
     * listens for state changes, ie a user logging in or out
     * and if logging in, loading the associated profile info
     * @returns
     */
    initializeAuthListener() { 
      return new Promise((resolve) => {
        fbAuthStateListener(async (user: any) => {
          this.user = user ? user : null;// debugger;
          const profile = (await fbGetUserProfile()) as any;
          this.profile =  profile ? profile : null;
          setStore('user', this.user);
          setStore('profile', this.profile);
          resolve(true);
        });
        /* fbCollectionListener('users',(user: any) => {
         console.log(user)
       });  
       resolve(true);*/
      });
    },
    /**
     *
     * @param data
     */
    async logInUser(email: string, password: string,userType: string) {//fbSignIn('admindemo@gmail.com', 'Admin@123');
      try {
        this.user = null,this.profile=null;
        const response = await fbSignIn(email, password);
        if(response){
          this.user = response.user ? response.user : null;
          const profile =  await fbGetUserProfile();
          if(profile){
            this.profile = profile ? profile : null;
            if(!this.profile.admin && userType==="user"){
              setStore('user', this.user);
              setStore('profile', this.profile);
              this.error = null;
            }else if(this.profile.admin && userType==="admin"){
              setStore('user', this.user);
              setStore('profile', this.profile);
              this.error = null;
            }else{
              this.user = null;
              this.profile=null;
              this.error = "Invalid login as User provided...";
            }
          }
          return true;
          /* this.profile = profile;
          setStore('user', this.user);
          setStore('profile', this.profile);
          this.error = null; */
          
        }else{
          this.user = null;
          this.profile = null;
          this.error="Username or Password does not match";
          return false;
        }
      } catch (e: any) {
        this.user = null;
        this.profile = null;
        this.error="Username or Password does not match";
        return false;
      }
    },
    async forgotPassword(email: string) {
      if (!email) {
        this.error = "Please enter the email address.";
        return;
      }
      try {
        const response = await fbForgotPassword(email);
        debugger;
        this.message= "Your password has been reset successfully";
        return true;
      } catch (e: any) {
        this.error = 'Please type in a valid email address.';
        return false;
      }

    },
    /**
     *
     * @param data
     */
    async logoutUser() {
      try {
        await fbSignOut();
        this.user = null;
        this.profile = null;
        this.error = null;
        setStore('user', null); debugger;
        setStore('profile', null);
        return true;
      } catch (e: any) {
        this.error = e;
        return false;
      }
    },

    /*
     *
     * @param data
     */
    async createAccount(email: string, password: string, company: string) {
      try {
        debugger;
        const { user, profile } = await fbCreateAccount(email, password, company);
        this.user = user ? user : null;
        this.profile = profile ? profile : null;
        this.error = null;
        return true;
      } catch (e: any) {
        this.user = null;
        this.error = e;
        return false;
      }
    },
    getAllInActiveComUsers() {
      return new Promise((resolve) => {
        fbGetAllInActiveComUsers('users', async (users: any) => {
          if(users){
            this.inActiveCompUsers = users.filter((u: any)=> u.active===false && u.admin===false)
          }else{
            this.inActiveCompUsers =  null;
          }
          
          resolve(true);
        });
      });
    },
    getAllActiveComUsers() {
      return new Promise((resolve) => {
        fbGetAllActiveComUsers('users', async (users: any) => {
          this.activeCompUsers =  null;
          if(users){
            this.activeCompUsers = users.filter((u: any)=> u.active===true && u.admin===false)
          }
          resolve(true);
        });
      });
    },
    async setInActiveComUser(uid: string) {//fbSetInActiveUserProfile
      const res = (await fbSetApproveToUser(uid)) as any;
        if(res){
          return new Promise((resolve) => {
            fbGetAllInActiveComUsers('users', async (users: any) => {
              this.inActiveCompUsers=null;
              if(users){
                this.inActiveCompUsers = users.filter((u: any)=> u.active===false && u.admin===false)
              }
              resolve(true);
            });
          });
        }
     /*  return new Promise((resolve) => {
        fbGetAllInActiveComUsers('users', async (users: any) => {
          this.inActiveCompUsers = users ? users : null;
          resolve(true);
        });
      }); */
    },
    async createProduct(
      name: string,
      description: string,
      ) {//userId: string,quantity: number
        if(name && description ){//&& quantity
          const res = await fbCreateProduct(name,description);//userId,quantity
          if(res){
              this.error=null;
              return true;
          }else{
            this.error="Please enter valid details";   
            return false;
          }
         
        }else{
          this.error="Please enter valid details";   
          return false;
        }
     
    },
    async getUserItemDetail(uid: string) {
      const res = await fbGetUserDetail(uid);
        if(res){
            this.userProductDetails =res;
            return true;
        }
    },
    async setUserStatus(status: boolean,userId: any){
      const res = await fbSetUserStatus(status,userId);
      const profile =  await fbGetUserProfile();
      if(res && profile){
        this.profile=profile;
        return true;
      }
    },
    async setNotification(note: boolean){
      const res = await fbSetNotification(note);
      const profile =  await fbGetUserProfile();
      if(res && profile){
        this.profile=profile;
        return true;
      }
    },
    async sentMessage(message: string) {
      if (message) {
          const res = await fbSentMessage(message);
          if (res) {
              this.error = null;
              return true;
          } else {
              this.error = "Please enter valid message";
              return false;
          }
      } else {
          this.error = "Please enter a message";
          return false;
      }
  },
  async adminSentMessage(message: string, uid: string) {
      if (message) {
          const res = await fbAdminSentMessage(message, uid);
          if (res) {
              this.error = null;
              return true;
          } else {
              this.error = "Please enter valid message";
              return false;
          }
      } else {
          this.error = "Please enter a message";
          return false;
      }
  },
    

  },
});
