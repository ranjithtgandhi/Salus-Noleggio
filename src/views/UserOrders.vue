<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Home page" />

      <div class="outerPadding">
        <div v-if="userRequestItems.length">
          <div v-for="(item, a) in userRequestItems" v-bind:key="a">
            <ion-row>
              <ion-col size="12">
                <div class="text-lightgrey" style="float:right"> {{ item[0] }}</div>
              </ion-col>
            </ion-row>
            <span v-for="(pro, i) in item[1]" v-bind:key="i">
              <ion-card :key="i">
                <span v-for="(product, j) in pro.products" v-bind:key="product.id">
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
                      <ion-card-title class="text-lightred">{{
                        product.qty
                      }}</ion-card-title>
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
                  <div
                    v-bind:class="[
                      pro.statusMessage != 'pending'
                        ? 'text-green ion-text-capitalize'
                        : 'text-yellow ion-text-capitalize',
                    ]"
                    class=""
                  >
                    {{ pro.statusMessage }}
                  </div>
                </ion-col>
              </ion-row>
              </ion-card>
              <!-- <span v-for="(product, j) in item.products" v-bind:key="product.id">
              {{product.name}} 
              </span> -->
            </span>
          </div>
        </div>
        <div v-if="!userRequestItems.length">
          <ion-row class="ion-align-items-center py-5">
            <ion-col size="9">
              <ion-card-title class="text-darkblue pb-5">
                No Results Found!
              </ion-card-title>
            </ion-col>
          </ion-row>
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
import { useRouter, useRoute } from "vue-router";
import { defineComponent } from "vue";
import moment from "moment";

import ExploreContainer from "@/components/ExploreContainer.vue";
export default defineComponent({
  name: "UserOrders",
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
      totalOrders: 0,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  async beforeUpdate() {
    const loader = document.getElementById("loaderContainer");
    loader.style.display = "block";
    const route = useRoute();
    const userId = route.params.id;
    this.userRequestData = await fbGetUserRequestedProducts(userId);
    if (this.userRequestData) {
      const items = this.userRequestData.items;
      debugger;
      items.sort(function (a, b) {
        return new Date(b.deliveryDate) - new Date(a.deliveryDate);
      });
      this.userRequestItems = items;
      const proObj = {};
      for (const item of items) {
        const deliveryDate = this.getDate(item.deliveryDate);
        if (!proObj[deliveryDate]) {
          proObj[deliveryDate] = [];
        }
        proObj[deliveryDate].push(item);
        //if (typeof proObj[pos] === 'undefined'!proObj[pos]) {pos++}
      }
      this.userRequestItems = Object.entries(proObj);
      console.log(this.userRequestItems);
      //this.userRequestItems = items;
      /* for (const [pro,i] of Object.entries(proObj)) {
        console.log(pro)
        console.log(i)
      }
      
      console.log(proObj); */
    }
    loader.style.display = "none";
  },
  methods: {
    getDate: function (date) {
      return moment(date).format("DD MMM YYYY");
    },
    getYYYYMMDD: function (date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
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
