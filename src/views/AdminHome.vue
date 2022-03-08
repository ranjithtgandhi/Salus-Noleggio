<template>
  <ion-page><ExploreContainer name="Home page" />
    <ion-content :fullscreen="true" class="userHomePage">
      
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)" pull-factor="10" pull-min="100" pull-max="200">
      <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>
          <div class="outerPadding">
        
            <ion-card :key="j">
              <ion-row class="p-5">
                <ion-col size="4" class="ion-text-center">
                  <ion-card-title class="text-green font-size">{{
                    totalOrders
                  }}</ion-card-title>
                  <div class="text-homedarkblue">Total Orders</div>
                </ion-col>
                <ion-col size="4" class="ion-text-center ion-border-left">
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
            <div v-if="userRequestItems.length">
            <div v-for="request in userRequestItems" v-bind:key="request.id">
              <ion-card v-for="(item,i) in request.items" v-bind:key="item.id">
              <!-- <span>{{request.id}} </span> | <span>{{item.id}} </span> -->
                <span v-for="(pro, j) in item.products" v-bind:key="pro.id">
                  <ion-row :key="j" class="custom-border-bottom">
                    <ion-col size="8.5">
                      <ion-card-title class="text-lightred">{{ pro.name }}</ion-card-title>
                      <ion-card-subtitle class="text-lightgrey"
                        >{{ pro.description }}  </ion-card-subtitle
                      >
                    </ion-col>
                    <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
                      <ion-card-title class="text-lightred">{{ pro.qty }}</ion-card-title>
                      <ion-card-subtitle class="text-lightgrey">Qty </ion-card-subtitle>
                    </ion-col>
                  </ion-row>
                  </span>
                  <ion-row>
                    <ion-col size="12">
                      <div class="text-homedarkblue">To: {{item.company}} </div>
                    </ion-col>
                  </ion-row>
                  <ion-row class="custom-border-top ion-align-items-center">
                    <ion-col size="5">
                      <div class="requesttext-lightgrey">Request : {{ item.statusMessage }}</div>
                    </ion-col>
                    <ion-col size="3.5" class="ion-text-center" v-if="item.statusMessage=='pending'">
                      <div class="redCustomBtn customPadding" @click="presentAlertConfirm('rejected',request.id,request.items,item.id,i)">
                        Reject
                      </div>
                    </ion-col>
                    <ion-col size="3.5" class="ion-text-center" v-if="item.statusMessage=='pending'">
                      <div class="greenCustomBtn customPadding" @click="presentAlertConfirm('accepted',request.id,request.items,item.id,i)">Accept</div>
                    </ion-col>
                    <ion-col size="6" offset="1" class="ion-text-center" v-if="item.statusMessage!='pending'">
                        <div class="customDropdown">
                          <ion-item>
                          <ion-select placeholder="Select option" v-model="item.statusMessage"  name="requestStatus" interface="popover"   @ionChange="presentAlertConfirm($event.target.value,request.id,request.items,item.id,i)" >
                        
                          <ion-select-option  value="accepted">Accepted</ion-select-option>
                            <ion-select-option  value="to work">To work</ion-select-option>
                            <ion-select-option value="to delivered">To delivered</ion-select-option>
                          </ion-select>
                        </ion-item>
                      </div>
                    </ion-col>
                  </ion-row>
              </ion-card>
            </div>
            </div>
            <div v-if="!userRequestItems.length">
            <ion-row class="ion-align-items-center  py-5">
                <ion-col size="12" class="ion-text-center">
                  <ion-card-title class="text-darkblue pb-5">
                  No Records Found!
                  </ion-card-title>
                </ion-col>
              </ion-row>
            </div>
            
                    
          
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
 IonRefresher, IonRefresherContent
} from "@ionic/vue";
import { useAuthStore } from "@/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { toastAlert } from "../service/common";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { chevronDownCircleOutline } from 'ionicons/icons'
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
  //  IonRefresher, IonRefresherContent
  },
  data() {
    return {
      userRequestData: null,
      userRequestItems: [],
      totalOrders: 0,
      totalPending: 0,
      totalDeliver: 0
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
     const doRefresh = (event) => {
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
     }
    return { 
    chevronDownCircleOutline,
    IonRefresher,
    IonRefresherContent,
    doRefresh
    }
  },
  async beforeUpdate() { 
    const requests = await queryObjectCollection({ collectionName: "requests" });
    //this.userRequestData = await fbGetUserRequestedProducts(authStore.user.uid);
    if (requests) {
      for (const [key,value]  of Object.entries(requests)) {
        for (const items of Object.entries(value)){
          const items = value.items;
          this.totalOrders=0,this.totalPending=0,this.totalDeliver=0;
            if(items.length){
              this.totalOrders = items.length;
              const totalPending = items.filter((item)=> item.statusMessage=='pending');
              this.totalPending = totalPending.length || 0;
              const totalDeliver = items.filter((item)=> item.statusMessage=='to work' || 'to delivered');
              this.totalDeliver = totalDeliver.length || 0;
            }
        } 
      }
      this.userRequestItems = requests;
      console.log(this.userRequestItems)
    }
  },
  methods: {
    async presentAlertConfirm(status,uid,items,proId,pos) {
      let selStatus='';
      if(!status){
          toastAlert("please select the valid request");
          return false;
      }
      if(status=='accepted' && status=='rejected' ){
          selStatus= `to ${status}`
      }else{
        selStatus = status;
      }
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        subHeader: `Are you sure do you want ${selStatus}?`,
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
              const loader = document.getElementById("loaderContainer");
              loader.style.display='block';
              console.log(status);
              console.log('uid',uid);
              console.log('items',items);
              console.log('proId',proId);
               console.log('pos',pos);
               const product = items[pos];
              if(status==='accepted'){
                product.status=1;
                product.statusMessage="accepted";
                product.updatedAt=new Date().getTime();
              }else if(status==='rejected'){
                 product.status=0;
                 product.statusMessage="rejected";
                 product.updatedAt=new Date().getTime();
              }
              else{
                product.statusMessage=status;
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
                  loader.style.display='none';
              }else{
                loader.style.display='none';
              }
            },
          },
        ],
      });
      return alert.present();
    },
    
    /*  async onChangeOrderStatus(e){
      const selData = e.target.value;
      if(!selData){
          toastAlert("please select the valid request")
      }
     var name = e.target.options[e.target.options.selectedIndex].text;
        console.log('id ',id );
        console.log('name ',name );
    }, */
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
