<template>
  <ion-page>
    <ion-content :fullscreen="true" class="userHomePage">
      <ExploreContainer name="Home page" />
      <div class="outerPadding">
        <ion-card :key="j">
          <ion-row class="p-5">
            <ion-col size="4" class="ion-text-center">
              <ion-card-title class="text-green font-size">{{
                totalOrders
              }}</ion-card-title>
              <div class="text-homedarkblue">Total Orders</div>
            </ion-col>
            <ion-col size="4" class="ion-text-center">
              <ion-card-title class="text-yellow font-size">{{
                totalOrders
              }}</ion-card-title>
              <div class="text-homedarkblue">Order pending</div>
            </ion-col>
            <ion-col size="4" class="ion-text-center ion-border-left">
              <ion-card-title class="text-green font-size">0</ion-card-title>
              <div class="text-homedarkblue">To deliver</div>
            </ion-col>
          </ion-row>
        </ion-card>

        <div v-for="request in userRequestItems" v-bind:key="request.id">
          <ion-card v-for="(item,i) in request.items" v-bind:key="item.id">
           <span>{{request.id}} </span> | <span>{{item.id}} </span>
            <span v-for="(pro, j) in item.products" v-bind:key="pro.id">
              <ion-row :key="j">
                <ion-col size="8.5">
                  <ion-card-title class="text-lightred">{{ pro.name }}</ion-card-title>
                  <ion-card-subtitle class="text-lightgrey"
                    >{{ pro.description }}</ion-card-subtitle
                  >
                </ion-col>
                <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
                  <ion-card-title class="text-lightred">{{ pro.qty }}</ion-card-title>
                  <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
                </ion-col>
              </ion-row>
              </span>
              <ion-row>
                <ion-col size="12">
                  <div class="text-homedarkblue">To: Admin </div>
                </ion-col>
              </ion-row>
              <ion-row class="custom-border-top ion-align-items-center">
                <ion-col size="5">
                  <div class="requesttext-lightgrey">Request : {{ item.statusMessage }}</div>
                </ion-col>
                <ion-col size="3.5" class="ion-text-center">
                  <div class="redCustomBtn customPadding" @click="presentAlertConfirm('reject',request.id,request.items,item.id,i)">
                    Reject
                  </div>
                </ion-col>
                <ion-col size="3.5" class="ion-text-center">
                  <div class="greenCustomBtn customPadding" @click="presentAlertConfirm('accept',request.id,request.items,item.id,i)">Accept</div>
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
                    <ion-select-option value="accept">Accepted</ion-select-option>
                    <ion-select-option value="towork">To work</ion-select-option>
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
                    <ion-select-option value="accept">Accepted</ion-select-option>
                    <ion-select-option value="towork">To work</ion-select-option>
                    <ion-select-option value="todelivered"
                      >To delivered</ion-select-option
                    >
                  </ion-select>
                </ion-item>
              </div>
            </ion-col>
          </ion-row>
        </ion-card> -->
      </div>
    </ion-content>
  </ion-page>
</template>
<style></style>
<script>
import { queryObjectCollection,fbAdminUpdateUserReqPro } from "../store/firebase";
import {
  IonPage,
  IonContent,
  IonCard,
  IonItem,
  IonSelect,
  IonSelectOption,
  alertController,
  onIonViewWillEnter,
} from "@ionic/vue";
import { useAuthStore } from "@/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { toastAlert } from "../service/common";
import ExploreContainer from "@/components/ExploreContainer.vue";

export default defineComponent({
  name: "AdminHome",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonCard,
    IonItem,
    IonSelect,
    IonSelectOption,
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
    const router = useRouter();
    onIonViewWillEnter(() => {
      if (!authStore.isAdmin) {
        router.replace("/tabs/UserHome");
      }
    });
  },
  async beforeUpdate() {
    const requests = await queryObjectCollection({ collectionName: "requests" });
    //this.userRequestData = await fbGetUserRequestedProducts(authStore.user.uid);
    if (requests) {
      for (const request of Object.entries(requests)) {
        for (const items of Object.entries(request)) this.totalOrders = items.length || 0;
      }
      this.userRequestItems = requests;
    }
  },
  methods: {
    async presentAlertConfirm(status,uid,items,proId,pos) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        subHeader: "Are you sure do you want to delete?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",/* 
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            }, */
          },
          {
            text: "Yes",
            id: "confirm-button",
            handler: async() => {
              console.log(status);
              console.log('uid',uid);
              console.log('items',items);
              console.log('proId',proId);
               console.log('pos',pos);
               const product = items[pos];
              if(status==='accept'){
                product.status=1;
                product.statusMessage="accepted";
                product.updatedAt=new Date().getTime();
              }else{
                product.status=0;
                product.statusMessage="rejected";
                product.updatedAt=new Date().getTime();
              }
              items[pos] = product;
              const res = await fbAdminUpdateUserReqPro(uid,items)
              if(res){
                toastAlert('Your request updated successfully...')
                const requests = await queryObjectCollection({ collectionName: "requests" });
                  if (requests) {
                    for (const request of Object.entries(requests)) {
                      for (const items of Object.entries(request)) this.totalOrders = items.length || 0;
                    }
                    this.userRequestItems = requests;
                  }
                  
              }
            },
          },
        ],
      });
      return alert.present();
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
