<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Home page" />

      <div class="outerPadding">
        <div v-for="(item, i) in userRequestItems" v-bind:key="item.id">
          <ion-card :key="i">
           <ion-row>
              <ion-col size="12">
                <div class="text-lightgrey">Delivery Date: {{getDate(item.deliveryDate)}}</div>
              </ion-col>
            </ion-row>
            <!--  v-bind:class="[(i>0) ? 'custom-border-top': '']" -->
            <span v-for="(product, j) in item.products" v-bind:key="product.id">
              
              <ion-row v-bind:class="[j > 0 ? 'custom-border-top' : '']">
                <ion-col size="8.5">
                  <ion-card-title class="text-lightred">{{
                    product.name
                  }}</ion-card-title>

                  <ion-card-subtitle class="text-lightgrey">{{
                    product.description
                  }}</ion-card-subtitle>
                </ion-col>
                <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
                  <ion-card-title class="text-lightred">{{ product.qty }}</ion-card-title>
                  <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
                </ion-col>
              </ion-row>
            </span>
            <ion-row>
              <ion-col size="12">
                <div class="text-homedarkblue">To: Admin</div>
              </ion-col>
            </ion-row>
            <ion-row class="custom-border-top ion-align-items-center">
              <ion-col size="9">
                <div class="requesttext-lightgrey">Request</div>
              </ion-col>
              <ion-col size="3" class="ion-text-center">
                <div class="text-yellow">{{ item.statusMessage }}</div>
              </ion-col>
            </ion-row>
          </ion-card>
        </div>
        <!--    <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>
              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="9">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <div class="text-green">Sent</div>
            </ion-col>
          </ion-row>
        </ion-card> -->

        <!--  <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="9">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <div class="text-green">Sent</div>
            </ion-col>
          </ion-row>
        </ion-card>
        <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="9">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <div class="text-green">Sent</div>
            </ion-col>
          </ion-row>
        </ion-card>
        <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top">
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Bathrob</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Bathrob of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">40</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top">
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">10</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="9">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <div class="text-yellow">Pending</div>
            </ion-col>
          </ion-row>
        </ion-card> -->
      </div>
    </ion-content>
    <!--    <ion-content :fullscreen="true" class="userHomePage" >
      <ExploreContainer name="Home page" />
      <div class="outerPadding">
        <ion-card>
          <ion-row class="p-5">
            <ion-col size="6" class="ion-text-center">
              <ion-card-title class="text-yellow font-size">0</ion-card-title>
              <div class="text-homedarkblue">Order pending</div>
            </ion-col>
            <ion-col size="6" class="ion-text-center ion-border-left">
              <ion-card-title class="text-green font-size">0</ion-card-title>
              <div class="text-homedarkblue">To deliver</div>
            </ion-col>
          </ion-row>
        </ion-card>
        <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>
              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="5">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="3.5" class="ion-text-center">
              <div class="redCustomBtn customPadding">Reject</div>
            </ion-col>
            <ion-col size="3.5" class="ion-text-center">
              <div class="greenCustomBtn customPadding">Accept</div>
            </ion-col>
          </ion-row>
        </ion-card>

        <ion-card>
          <ion-row>
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">400</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top">
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Bathrob</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Bathrob of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">40</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top">
            <ion-col size="8.5">
              <ion-card-title class="text-lightred">Metal rods</ion-card-title>

              <ion-card-subtitle class="text-lightgrey"
                >Metal rods of cast iron materials with..</ion-card-subtitle
              >
            </ion-col>
            <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
              <ion-card-title class="text-lightred">10</ion-card-title>
              <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="text-homedarkblue">To: Daniel Richardo</div>
            </ion-col>
          </ion-row>
          <ion-row class="custom-border-top ion-align-items-center">
            <ion-col size="6">
              <div class="requesttext-lightgrey">Request</div>
            </ion-col>
            <ion-col size="6" class="ion-text-center">
              <div class="customDropdown">
                <ion-item>
                  <ion-select placeholder="Select option" interface="popover">
                    <ion-select-option value="accept"
                      >Accepted</ion-select-option
                    >
                    <ion-select-option value="towork"
                      >To work</ion-select-option
                    >
                    <ion-select-option value="todelivered"
                      >To delivered</ion-select-option
                    >
                  </ion-select>
                </ion-item>
              </div>
            </ion-col>
          </ion-row>
        </ion-card>
      </div>
    </ion-content> -->
  </ion-page>
</template>

<script>
import { fbGetUserRequestedProducts } from "../store/firebase";
import { IonPage, IonContent, IonCard } from "@ionic/vue"; //,IonItem,IonSelect,IonSelectOption
import { useAuthStore } from "@/store";
import { defineComponent } from "vue";
import moment from 'moment'

import ExploreContainer from "@/components/ExploreContainer.vue";
export default defineComponent({
  name: "UserHome",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonCard,
    //IonItem,IonSelect,IonSelectOption
  },
  data() {
    return {
      userRequestData: null,
      userRequestItems: [],
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  async beforeUpdate() {
    const authStore = useAuthStore();
    this.userRequestData = await fbGetUserRequestedProducts(authStore.user.uid);
    if (this.userRequestData) {
      this.userRequestItems = this.userRequestData.items;
    }
  },
  methods:{
    getDate : function (date) {
        return moment(date).format('DD MMM YYYY');
    }
  }
});
</script>
<style>
/* Admin start */
ion-select {
  width: 100%;
  color: #1dba20;
  font-size: 14px;
  text-align: center;
  border: 1px solid rgb(171 174 188 / 50%);
  padding: 6px 15px 6px 5px;
  border-radius: 4px;
  margin-right: 0px;
}
ion-select label {
  color: #1dba20;
}
.font-size {
  font-size: 22px;
}

.userHomePage {
  font-family: "Spartan-semibold";
}
.item.sc-ion-label-ios-h,
.item .sc-ion-label-ios-h {
  color: #1bab1d;
  font-size: 12px;
}
/* Admin end */
</style>
