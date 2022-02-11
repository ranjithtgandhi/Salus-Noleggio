<template>
  <ion-page>
    <!-- Admin -->
    <ion-content :fullscreen="true">
      <ExploreContainer name="Document page" />
      <div class="outerPadding" style="margin:10px 21px">
      <div class="title text-lightred ion-padding ion-text-center">{{selType}}</div>
        <ion-tabs style="position: unset !important">
          <ion-tab-bar slot="top" class="userApprovalTab">
            <ion-tab-button  data-title="user" @click="selUserTab('User')"  tab="userPageTab" href="userPageTab">
              <ion-label>User</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="approvalPageTab"  @click="selUserTab('Approval')"  data-title="approval" href="approvalPageTab">
              <ion-label class="d-flex"
                >Approval &nbsp;<span class="redCircle"> {{authStore.inActiveCompUsers?authStore.inActiveCompUsers.length:0}}</span></ion-label
              >
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import $ from "jquery";
import { IonPage, IonContent, IonTabBar, IonTabButton, IonTabs } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { chevronForwardOutline, calendar, personCircle } from "ionicons/icons";
import { defineComponent,onMounted } from 'vue';
import { useAuthStore } from "@/store"
export default defineComponent({
  name: "AdminUser",
  components: { ExploreContainer, IonContent, IonPage, IonTabBar, IonTabButton, IonTabs },
  data() {
    return {
      selType: "User",
    };
  },
  setup() {
     const authStore = useAuthStore();//debugger;
     //if(!authStore.inActiveCompUsers){
    
      onMounted( async() => { 
        await authStore.getAllInActiveComUsers();
        console.log(authStore.inActiveCompUsers)
      })
    //}
    return {
      authStore,
      chevronForwardOutline,
      calendar,
      personCircle,
    };
  },
  methods: {
    selUserTab(type){
      this.selType=type;
    }
  },
});
</script>
<style>
.font-weight {
  font-weight: 700;
}
.listOfContainer {
  padding: 6px 16px;
}
/* Admin */
.userApprovalTab {
  --background: var(--ion-color-primary);
  border-radius: 5px;
  color: #fff;
  text-align: center;
  font-family: "Spartan-semibold";
  font-size: 14px;
  padding: 0px 10px !important;
}
.userApprovalTab ion-tab-button{
color:#fff;
}
.activeTab {
  background: #fff;
  color: var(--ion-color-primary);
  padding: 10px 5px;
  border-radius: 5px;
  font-family: "Spartan-semibold";
  align-items: center;
}
</style>
