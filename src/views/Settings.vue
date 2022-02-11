<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Setting page" />
      <div class="listOfMenu">
        <ul class="ion-padding ion-no-margin">
          <li v-if="profile ? profile.admin === false : ''">
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="personCircleOutline"></ion-icon>
              <ion-label>{{ profile ? profile.company : "" }}</ion-label>
            </div>
            <div class="flex-property"></div>
          </li>
          <li>
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="mailOpen"></ion-icon>
              <ion-label>{{ user ? user.email : "" }}</ion-label>
            </div>
            <div class="flex-property"></div>
          </li>
          <li>
            <div class="d-flex ion-align-items-center">
              <ion-icon :icon="notifications"></ion-icon>
              <ion-label>Notification</ion-label>
            </div>
            <div>
              <ion-toggle checked="false"></ion-toggle>
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

<script lang="ts">
import { useAuthStore } from "@/store";
import { IonPage, IonContent, IonToggle } from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import ExploreContainer from "@/components/ExploreContainer.vue";
import {
  mailOpen,
  notifications,
  logOutOutline,
  personCircleOutline,
} from "ionicons/icons";

export default {
  name: "Setting",
  components: { ExploreContainer, IonContent, IonPage, IonToggle },
  setup() {
    const store = useAuthStore();
    const { logoutUser, user, profile } = store;
    const router = useRouter();
    /* onMounted(async () => {
      await store.initializeAuthListener();
    }) */
    const doLogout = async () => {
      await logoutUser();
      router.replace("/login/loginUserPage");
    };
    return {
      profile,
      user,
      store,
      doLogout,
      mailOpen,
      notifications,
      logOutOutline,
      personCircleOutline,
    };
  },
};
</script>
