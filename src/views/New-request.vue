<template>
  <ion-page>
    <!-- User -->
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <form>
      <div class="outerPadding">
        <div class="requstContainer">
          <div class="deliveryContainer">
            <div class="text-grey" style="padding: 0 10px 10px 10px; font-size: 10px">
              Delivery date
            </div>
            <div class="ion-padding deliveryDate" style="padding:5px">
            <ion-datetime  :min="currentDate" max="2099-12-31" placeholder="Please select date" displayFormat="DD-MMM-YYYY"  name="`myDate`" v-model="myDate" ref="myDate" ></ion-datetime>
            </div>
          </div>
          <div class="goodsSelect" style="padding-top: 25px">
            <!-- <div class="text-grey" style="padding: 0 10px 10px 10px; font-size: 10px">
              Select Goods
            </div> -->
            
            <div v-if="userPreReqData.length!==0">
            <div v-for="(product, i) in userPreReqData"
                v-bind:key="product.id">
              <accordion-component @show="log" :title="product.name"><!--{{ product.name }}-->
                <ion-accordion value="colors" :icon="arrowDownCircle" :key="i">
                <div>
                  <!--<div slot="header">
                    <div class="plywood-invoice ion-border-bottom">
                      {{ product.name }} <span style="float:right"> 
                        <ion-icon class="delete" :icon="caretDownOutline"></ion-icon></span>
                        <span style="float:right"  @click="userRemoveProForNewReq(product)"> 
                        <ion-icon class="delete" :icon="trashOutline"></ion-icon></span>
                    </div>
                  </div>-->
                  
                  <ion-list slot="content">
                    <p class="doc-subtitle text-grey ion-border-top pt-10">
                      {{ product.description }}
                    </p>
                    <ion-row class="ion-align-items-center" style="width: 100%">
                      <ion-col size="3">
                        <div class="quantity-text">Quantity:</div>
                      </ion-col>
                      <ion-col size="3">
                      <div class="ion-padding price">
                        <div><input type="number" :name="`qty[${i}]`" :ref="`qty[${i}]`"  style="width:100%;background:#f5f9ff;color:#ABAEAD;border:0"></div>
                        </div>
                      </ion-col>
                      
                      <ion-col size="4" class="ion-text-right">
                      <div class="value-limit">Max.qty:{{product.qty}}</div>
                      </ion-col>
                      <ion-col size="2">
                      <span style="float:right"  @click="userRemoveProForNewReq(product)"> 
                        <ion-icon class="delete" :icon="trashOutline"></ion-icon></span>
                      </ion-col>
                    </ion-row>
                  </ion-list>
                  </div>
                </ion-accordion>
              </accordion-component>
              </div>
            </div>
            <span v-if="userPreReqData.length === 0">
          <ion-row class="ion-align-items-center ion-border-bottom py-5">
            <ion-col size="12" class="ion-text-center">
              <ion-card-title class="text-darkblue pb-5">
              No Records Found!
              </ion-card-title>
            </ion-col>
          </ion-row>
        </span>
          </div>
          <div class="ion-margin-top ion-border">
            <ion-row class="text-grey ion-align-items-center" @click="addMoreGoods">
              <ion-col size="10" class="ion-no-padding">Add more goods</ion-col>
              <ion-col size="2" class="ion-text-center ion-no-padding"
                ><ion-icon :icon="addCircleOutline" style="font-size:30px"></ion-icon></ion-col>
            </ion-row>
          </div>
        </div>

        <div class="requestBtn">
          <div class="makeRequestBtn" @click="userMakeRequest">Make request</div>
        </div>
      </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";
import { useRouter } from "vue-router";
import { setStore,getStore,removeStore } from "../store/store";
import { toastAlert } from "../service/common";
import {
  fgUserProRequestToAdmin,
  //fbUserAddProForNewReq,
} from "../store/firebase";
import { useAuthStore } from "@/store"
/* User module */
import { IonPage, IonContent,IonDatetime } from "@ionic/vue";
import { ref } from "vue";
import { arrowDownCircle, trashOutline,removeCircleOutline, addCircleOutline, caretDownOutline } from "ionicons/icons";
import '../components/accordion.js';
export default {
  name: "NewRequest",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonDatetime
  },
  data() {
    const d=new Date();
    const todayDate=d.getDate()+'-'+d.toString().substr(4,3)+'-'+d.getFullYear();
    return {
      userPreReqData: [],
      myDate:todayDate,
      loader:document.getElementById("loaderContainer"),
    };
  },
  setup() {
    const router = useRouter();
    const accordionGroup = ref();
    const date = new Date();
    let month = '' +(date.getMonth()+1)
    let cdate = '' +date.getDate()
    if (month.length < 2) month = '0' + month;
    if (cdate.length < 2) cdate = '0' + cdate;
    const currentDate=`${date.getFullYear()}-${month}-${cdate}`; debugger
    const logAccordionValue = () => {
      if (accordionGroup.value) {
        console.log(accordionGroup.value.$el.value);
      }
    };
    const closeAccordion = () => {
      if (accordionGroup.value) {
        accordionGroup.value.$el.value = undefined;
      }
    };
    const addMoreGoods = () => {
      router.replace("/UserProductList");
    };
    return {
      addMoreGoods,
      arrowDownCircle,
      closeAccordion,
      trashOutline,
      removeCircleOutline,
      logAccordionValue,
      addCircleOutline,
      currentDate,
      caretDownOutline
    };
  },
  async beforeUpdate() {
    this.userPreReqData = (await getStore("userPreReqData")) || [];
  },
   methods: {
    async userRemoveProForNewReq(item) {
      
      this.loader.style.display='block';
      this.userPreReqData = await getStore('userPreReqData') || [];
      console.log(this.userPreReqData)
      if(this.userPreReqData.length){
        const pos = this.userPreReqData.findIndex((p)=> p.id===item.id)
        if(pos > -1){
            this.userPreReqData.splice(pos,1);
            setStore('userPreReqData',this.userPreReqData);
            toastAlert(`${item.name} Product updated successfully`);
        }
        this.loader.style.display='none';
      }
      
    },
    async userMakeRequest(){
      
      this.loader.style.display='block';
       const {profile}= useAuthStore();
      const userPreReqData=this.userPreReqData;
      const deliveryDate = new Date(this.myDate).getTime();
      const proItems=[];
      for(const [key, product]  of Object.entries(userPreReqData)){
        const maxQty=Number(product.qty);
        const cQty=Number(this.$refs['qty['+key+']'][0].value);
        if(cQty <=0 || cQty > maxQty){
          this.loader.style.display='none';
          toastAlert(`Please verify your Qty`);
          return false;
        }
        product.qty=cQty;
        console.log(product);
        proItems.push(product);
        //removeStore
      }
      const res = await fgUserProRequestToAdmin(proItems,deliveryDate,profile);
      this.loader.style.display='none';
        if(res){
          this.userPreReqData=[];
          await removeStore('userPreReqData');
          toastAlert(`New products request sent successfully`);
        }else{
          toastAlert(`New products request failed`);
        }
    }
  },
};
</script>

<style>
.requestBtn {
  width: 75%;
  margin: 0 auto;
  padding: 15px 0;
}
/* .requstContainer {
  height: calc(60vh - 0px);
  overflow: auto;
  padding: 0 0 15px 0;
} */
.makeRequestBtn {
  background: var(--ion-color-primary, #fc5a5f);
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  border-radius: 5px;
  font-family: "Spartan-medium";
  padding: 19px 15px;
}
.price {
    font-size: 12px;
    color: rgb(171 174 188 / 100%);
    padding: 5px 5px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border: 1px solid rgb(171 174 188 / 50%);
    border-radius: 4px;
}
.text-darkblue span {
  color: var(--ion-color-secondary);
  font-weight: 700;
  font-size: 11px;
  padding-left: 6px;
}
.productContainer ion-icon {
  color: #abaebd;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.value-limit{
  color: var(--ion-color-secondary);
    font-size: 12px;
    font-family: "Spartan-medium";
}
</style>
