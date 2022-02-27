<template>
  <ion-page>
    <!-- User v-if="profile.admin===false" -->
    <ion-tabs v-if="profile? profile.admin===false : false">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="UserHome" href="/tabs/UserHome">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="UserDocument" href="/tabs/UserDocument">
          <ion-icon :icon="documentTextSharp" />
          <ion-label>Document</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="UserNewRequest" href="/tabs/UserNewRequest">
          <ion-icon :icon="addCircleSharp" />
          <ion-label>New Request</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="UserChat" href="/tabs/UserChat">
          <ion-icon :icon="logoWechat" />
          <ion-label>Chat</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Settings" href="/tabs/Settings">
          <ion-icon :icon="settingsSharp"></ion-icon>
          <ion-label>Setting</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <!-- Admin -->
    <ion-tabs v-if="profile? profile.admin===true : false">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="AdminHome" href="/tabs/AdminHome">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="AdminUser" href="/tabs/AdminUser">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>User</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="AdminProductList" href="/tabs/AdminProductList">
          <ion-icon :icon="addCircleSharp" />
          <ion-label>Product</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="AdminChatUserList" href="/tabs/AdminChatUserList"><!-- AdminChat -->
          <ion-icon :icon="logoWechat" />
          <ion-label>Chat</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Settings" href="/tabs/Settings">
          <ion-icon :icon="settingsSharp"></ion-icon>
          <ion-label>Setting</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
/* import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
 import { homeOutline, documentTextSharp, addCircleSharp, logoWechat, settingsSharp } from 'ionicons/icons'; //User
 export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      homeOutline, 
      documentTextSharp, 
      addCircleSharp,
      logoWechat,
       settingsSharp
    }
  }
} */

/* Admin Start */
/* import { homeOutline, personCircleOutline, addCircleSharp, logoWechat, settingsSharp } from 'ionicons/icons'; //Admin
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      homeOutline, 
      personCircleOutline, 
      addCircleSharp,
      logoWechat,
       settingsSharp
    }
  }
} */
/* Admin End */
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  onIonViewWillEnter
} from "@ionic/vue";
import {
  homeOutline,
  documentTextSharp,
  personCircleOutline,
  addCircleSharp,
  logoWechat,
  settingsSharp,
} from "ionicons/icons";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";
import { defineComponent,onBeforeMount} from "vue";

export default defineComponent({
  name: "Tabs",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
     const router = useRouter(); 
    const {user,profile,isAdmin}= useAuthStore();
    
    onIonViewWillEnter(() => {
      console.log('Home page will enter');
    });
    return {
      profile,
      homeOutline,
      documentTextSharp,
      personCircleOutline,
      addCircleSharp,
      logoWechat,
      settingsSharp,
    };
  },
  /* data(){
    return{
      profile: null
    }
  },
  async mounted() {
    //console.log("THis is Before Mount")
     const authStore = await useAuthStore();
     this.profile=authStore.profile;
     debugger 
   
     
  },
  async beforeMount() {
    //console.log("THis is Before Mount")
     const authStore = await useAuthStore();
     const router = useRouter(); 
     this.profile=authStore.profile;
    if(!authStore.isAdmin){
        router.push("/tabs/UserHome");
    }
  }, */
});
</script>

<style>
ion-tab-bar {
  --background: #fff;
  --color: #000;
  box-shadow: 0px 0px 6px 2px #ffd5d5;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  padding: 8px 8px 15px 8px;
}
.ion-page {
  background: #fff;
}
ion-icon {
  font-size: 20px;
}

.brand-header {
  --background: #fc5a5f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
}
.ion-content {
  --background: #fff;
  --color: #000;
}
ion-card {
  box-shadow: 0px 0px 2px 2px #eeeeee;
  background: #fff;
  padding: 12px 12px;
  margin: 18px 5px;
}
.text-grey {
  color: var(--ion-color-medium);
  font-size: 12px;
  font-family: "Spartan-semibold";
}
.text-lightred {
  color: var(--ion-color-primary);
  font-size: 13px;
  font-family: "Spartan-semibold";
  padding-bottom: 5px;
}
.text-sublightred {
  color: var(--ion-color-primary);
  font-size: 10px;
  font-family: "Spartan-semibold";
  padding-bottom: 5px;
}
.text-lightgrey {
  --color: var(--ion-color-medium, #abaebd);
  font-size: 10px;
  font-family: "Spartan-semibold";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: none;
  font-weight: 100;
  margin: 0;
}
.requesttext-lightgrey {
  color: var(--ion-color-medium, #abaebd);
  font-size: 11px;
  font-family: "Spartan-semibold";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: none;
  font-weight: 100;
  margin: 0;
}
/* .text-darkblue {
  color: var(--ion-color-secondary);
  font-size: 12px;
} */

.text-yellow {
  color: var(--ion-color-danger);
  font-size: 11px;
  font-family: "Spartan-semibold";
  padding: 5px 2px;
}
.custom-border-top {
  border-top: 1px solid rgb(248 95 99 / 30%);
  margin-top: 6px;
  padding-top: 6px;
}
.custom-border {
  border: 1px solid rgb(171 174 189 / 40%);
  border-radius: 5px;
}

.plywood-invoice {
  color: var(--ion-color-secondary);
  font-size: 13px;
  padding: 6px 5px 15px 5px;
  font-family: "Spartan-semibold";
}
.quantity-text {
  color: var(--ion-color-secondary);
  font-size: 10px;
  font-family: "Spartan-semibold";
}
.doc-subtitle {
  --color: var(--ion-color-medium, #767780);
  font-size: 10px !important;
  white-space: unset;
  overflow: unset;
  text-overflow: unset;
  text-transform: none;
  /* font-family: 'Spartan-semibold'; */
}
</style>
