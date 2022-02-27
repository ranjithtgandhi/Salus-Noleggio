import { useAuthStore } from "@/store";
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';
import login from '../pages/login.vue';
import signup from '../pages/signup.vue';
import forgot from '../pages/forgot-password.vue';
import article from '../views/Add-Article.vue';
import { getStore} from "../store/store";
const authCheck = async (to: any, from: any, next: any) => {
  //debugger
  const store = useAuthStore();
  const isProfile = await getStore('profile');
  //console.log("authCheck", store.isLoggedIn);
  //console.log("getStore",await getStore('profile'))
  if (store.isLoggedIn && isProfile) {
    if (to.name === "login-user") {
      if(store.isAdmin){
        next({ name: "AdminHome" });
      }else{
        next({ name: "UserHome" });
      }
     
    } else {
      next();
        /* if(!store.isAdmin){
          next({ name: "UserHome" });
        }else{
          next();
        }  */
    }
  } else {
    if (to.name === "login-user" || to.name === "login-admin" ) {
      next();
    } else {
      next({name:"login-user"});
    }
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    
    path: '/login',
    component: login,
    children: [
      {
        path: '',
        redirect: '/login/loginUserPage'
      },
      {
        name: "login-user",
        path: 'loginUserPage',
        component: () => import('@/pages/loginUserPage.vue'),
        beforeEnter: authCheck,
      },
      {
        name: "login-admin",
        path: 'loginAdminPage',
        component: () => import('@/pages/loginAdminPage.vue'),
        beforeEnter: authCheck,
      },
    ]
  },
  {
    name: "signup",
    path: '/signup',
    component: signup,
    // component: () => import('@/pages/signup.vue')
  },
  {
    path: '/forgot',
    component: forgot,
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/UserHome'
      },
      /* User component */
      {
        name: "UserHome",
        path: 'UserHome',
        component: () => import('@/views/Home.vue'),
        beforeEnter: authCheck,
      },
      {
        name: 'UserDocument',
        path: 'UserDocument',
        component: () => import('@/views/Document.vue'),
        beforeEnter: authCheck,
      },
      {
        name: 'UserNewRequest',
        path: 'UserNewRequest',
        component: () => import('@/views/New-request.vue'),
        beforeEnter: authCheck,
      },
      {
        name: 'UserProductList',
        path: '/UserProductList',
        component: () => import('@/views/UserProductList.vue'),
        beforeEnter: authCheck,
      },
      {
        path: 'UserChat',
        component: () => import('@/views/Chat.vue'),
        beforeEnter: authCheck,
      },
      {
        path: 'Settings',
        component: () => import('@/views/Settings.vue'),
        beforeEnter: authCheck,
      },
      /* Admin component */
       {
        name: "AdminHome",
        path: 'AdminHome',
        component: () => import('@/views/AdminHome.vue'),
        beforeEnter: authCheck,
      }, 
      {
        path: 'AdminUser',
        component: () => import('@/views/AdminUser.vue'),
        beforeEnter: authCheck,
        children: [
          {
            path: '',
            redirect: '/tabs/AdminUser/userPageTab'
          },
          {
            path: 'userPageTab',
            component: () => import('@/views/userPageTab.vue')
          },
          {
            path: 'approvalPageTab',
            component: () => import('@/views/approvalPageTab.vue')
          },
        ]
      },
      {
        name: "AdminChatUserList",
        path: 'AdminChatUserList',
        component: () => import('@/views/AdminChatUserList.vue'),
        beforeEnter: authCheck,
      },
      {
        name: "AdminProduct",
        path: '/AdminProduct/:id',
        component: () => import('@/views/AdminProduct.vue'),
        beforeEnter: authCheck,
      },
      {
        name: "AdminProductList",
        path: 'AdminProductList',
        component: () => import('@/views/AdminProductList.vue'),
        beforeEnter: authCheck,
      },
      {
        name: "AdminProAssignToUser",
        path: '/AdminProAssignToUser/:id',
        component: () => import('@/views/AdminProAssignToUser.vue'),
        beforeEnter: authCheck,
      },
      {
        path: 'AdminChat/:id',
        component: () => import('@/views/AdminChat.vue'),
        beforeEnter: authCheck,
      },
      {
        name: "AdminAddArticle",
        path: '/AdminAddArticle',
        component: () => import('@/views/AdminAddArticle.vue'),
        
      }
      /* {
        path: 'AdminSettings',
        component: () => import('@/views/AdminSettings.vue')
      } */
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
