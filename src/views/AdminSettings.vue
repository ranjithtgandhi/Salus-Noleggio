<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Setting page" />
      <div class="listOfMenu">
        <ul class="ion-padding ion-no-margin">
          <li>
            <ion-icon :icon="personCircleOutline"></ion-icon>
            <ion-label>Company</ion-label>
          </li>
          <li>
            <ion-icon :icon="mailOpen"></ion-icon>
            <ion-label>johndoe123@company.com</ion-label>
          </li>
          <li>
            <div class="d-flex ion-align-items-center" >
              <ion-icon :icon="notifications"></ion-icon>
              <ion-label>Notification</ion-label>
            </div>
            <div>
               <ion-toggle checked="false"></ion-toggle>
            </div>
           
          </li>
          <li>
            <ion-icon :icon="logOutOutline"></ion-icon>
            <ion-label>Log out</ion-label>
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonToggle } from "@ionic/vue";
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
    return {
      mailOpen,
      notifications,
      logOutOutline,
      personCircleOutline,
    };
  },
};
</script>