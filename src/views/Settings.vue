<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Setting page" />
      <div class="listOfMenu">
        <ul class="ion-padding ion-no-margin">
          <li v-if="store.profile ? store.profile.admin === false : ''">
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="personCircleOutline"></ion-icon>
              <ion-label>{{ store.profile ? store.profile.company : "" }}</ion-label>
            </div>
            <div class="flex-property"></div>
          </li>
          <li>
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="mailOpen"></ion-icon>
              <ion-label>{{ store.user ? store.user.email : "" }}</ion-label>
            </div>
            <div class="flex-property"></div>
          </li>
          <li>
            <div class="d-flex ion-align-items-center">
              <ion-icon :icon="notifications"></ion-icon>
              <ion-label>Notification</ion-label>
            </div>
            <!-- {{store.profile.notification}} -->
            <div><!--  $event.target.value --> <!--  v-if=" store.profile.notification? checked='true' : checked='false' " -->
              <ion-toggle  
              value="store.profile.notification"
              v-bind:checked="(store.profile)?store.profile.notification:false"
             @ionChange="doNotification(store.profile.notification)" ></ion-toggle>
            </div>
          </li>
          <li @click="doLogout">
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="logOutOutline"></ion-icon>
              <ion-label>Log out</ion-label>
            </div>
            <div class="flex-property"></div>
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useAuthStore } from "@/store";
import { IonPage, IonContent, IonToggle} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ExploreContainer from "@/components/ExploreContainer.vue";
import {
  mailOpen,
  notifications,
  logOutOutline,
  personCircleOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "Setting",
  components: { ExploreContainer, IonContent, IonPage, IonToggle },
  setup() {
    const loader = document.getElementById("loaderContainer");
    const store = useAuthStore();
    const router = useRouter();
    /* onMounted(async () => {
      await store.initializeAuthListener();
    }) */
    const doLogout = async () => {
      loader.style.display='block';
      await store.logoutUser();
      router.replace("/login/loginUserPage");
      loader.style.display='none';
    };   
   
    const doNotification = async (val) => {
      loader.style.display='block';
       await store.setNotification(!val);
       loader.style.display='none';
    };
    
    return {
      store,
      doLogout,
      mailOpen,
      doNotification,
      notifications,
      logOutOutline,
      personCircleOutline,
    };
  },
});
</script>
