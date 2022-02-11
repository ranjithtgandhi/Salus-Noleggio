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
          this.user = user ? user : null;
          const profile = (await fbGetUserProfile()) as any;
          this.profile = profile;
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
    async createProduct(userId: string,
      name: string,
      description: string,
      quantity: number) {
        if(name && description && quantity){
          const res = await fbCreateProduct(userId,name,description,quantity);
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
    }
    

  },
});
