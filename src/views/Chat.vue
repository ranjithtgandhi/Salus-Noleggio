<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Chat Page" />
      <div class="outerPadding">
<!-- List of Chat -->
      <!-- <div class="chatAdminContainer">
        <ion-card>
          <ion-row class="ion-align-items-center">
            <ion-col size="1.5" class="ion-text-center">
              <div class="redCircle">1</div>
            </ion-col>
            <ion-col size="10.5">
              <ion-card-title class="text-darkblue pb-5">Company 01</ion-card-title>
              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
          </ion-row>
        </ion-card>
        <ion-card>
          <ion-row class="ion-align-items-center">
            <ion-col size="1.5" class="ion-text-center">
              <div class="redCircle">3</div>
            </ion-col>
            <ion-col size="10.5">
              <ion-card-title class="text-darkblue pb-5">Company 01</ion-card-title>
              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
          </ion-row>
        </ion-card>
      </div> -->

      <!-- Individual chat -->
       <ion-row>
        <ion-col size="9">
          <ion-card class="rose-bg">
            <ion-card-subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu
              consequat tortor volutpat.
            </ion-card-subtitle>
          </ion-card>
        </ion-col>
      </ion-row>
      <div class="dateContainer">
        <div class="chatDate">Yesterday</div>
      </div>

      <ion-row>
        <ion-col offset="3" size="9">
          <ion-card class="white-bg">
            <ion-card-subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu
              consequat tortor volutpat.
            </ion-card-subtitle>
          </ion-card>
        </ion-col>
      </ion-row>
      
      </div>
      <!-- text area -->
      <div class="chatTextBox">
        <ion-row class="ion-align-items-center">
          <ion-col size="9.5">
            <ion-input
              class="ion-padding-start"
              name="name"
              type="text"
              placeholder="Type here..."
            ></ion-input>
          </ion-col>
          <ion-col size="1">
            <ion-icon :icon="attachOutline" class="attachIcon"></ion-icon>
          </ion-col>
          <ion-col size="1.5">
            <ion-icon :icon="arrowForward" class="arrowIcon"></ion-icon>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { attachOutline, arrowForward } from "ionicons/icons";

export default {
  name: "Chat",
  components: { ExploreContainer, IonContent, IonPage },
  setup() {
    return {
      attachOutline,
      arrowForward,
    };
  },
};
</script>
<style>

.font-weight {
  font-weight: 700;
}
.rose-bg {
  background: #f9eaee;
  margin: 0px 0px 18px 0px;
}

.white-bg {
  background: var(--ion-color-secondary-contrast, #ffffff);
}
.dateContainer {
  position: relative;
  color: var(--ion-color-medium);
  font-size: 12px;
  text-align: center;
}
.chatDate::before {
  content: "";
  background: rgb(171 174 188 / 50%);
  position: absolute;
  width: 30%;
  height: 1px;
  left: 30px;
  top: 50%;
}
.chatDate::after {
  content: "";
  background: rgb(171 174 188 / 50%);
  position: absolute;
  width: 30%;
  height: 1px;
  right: 30px;
  top: 50%;
}
ion-input {
  border: none;
}
.chatTextBox {
  --color: #000;
  box-shadow: 0px 0px 1px 2px #f9eaee;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
}
.attachIcon {
  color: var(--ion-color-primary);
  font-size: 24px;
}

.arrowIcon {
  color: #ffffff;
  /* --color: var(--ion-color-light-contrast,#ffffff); */
  background: var(--ion-color-primary);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
}
</style>