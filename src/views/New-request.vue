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
            <div class="ion-padding deliveryDate">
            <ion-datetime  :min="currentDate" max="2099-12-31" placeholder="Please select date" displayFormat="DD-MMM-YYYY"  name="`myDate`" v-model="myDate" ref="myDate" ></ion-datetime>
            </div>
          </div>
          <div class="goodsSelect" style="padding-top: 25px">
            <!-- <div class="text-grey" style="padding: 0 10px 10px 10px; font-size: 10px">
              Select Goods
            </div> -->
            
            <div v-if="userPreReqData.length!==0">
              <ion-accordion-group
                v-for="(product, i) in userPreReqData"
                v-bind:key="product.id"
              >
                <ion-accordion value="colors" :toggle-icon="arrowDownCircle" :key="i">
                <div class="ion-border">
                  <div slot="header">
                    <div class="plywood-invoice ion-border-bottom">
                      {{ product.name }} <span style="float:right"  @click="userRemoveProForNewReq(product)"> 
                        <ion-icon class="delete" :icon="trashOutline"></ion-icon></span>
                    </div>
                  </div>
                  
                  <ion-list slot="content">
                    <p class="doc-subtitle text-grey">
                      {{ product.description }}
                    </p>
                    <ion-row class="ion-align-items-center" style="width: 100%">
                      <ion-col size="3">
                        <div class="quantity-text">Quantity:</div>
                      </ion-col>
                      <ion-col size="4">
                      <div class="ion-padding price">
                        <div><input type="number" :name="`qty[${i}]`" :ref="`qty[${i}]`"  style="width:100%;background:#f5f9ff;color:#ABAEAD;border:0"></div>
                        </div>
                      </ion-col>
                      
                      <ion-col size="5" class="ion-text-right">
                      <div class="value-limit">Max.qty:{{product.qty}}</div>
                      </ion-col>
                    </ion-row>
                  </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </div>
            <span v-if="userPreReqData.length === 0">
          <ion-row class="ion-align-items-center ion-border-bottom py-5">
            <ion-col size="9">
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
                ><ion-icon :icon="addCircleOutline"></ion-icon></ion-col>
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
/* User module */
import { IonPage, IonContent,IonDatetime, IonAccordion, IonAccordionGroup } from "@ionic/vue";
import { ref } from "vue";
import { arrowDownCircle, trashOutline,removeCircleOutline, addCircleOutline } from "ionicons/icons";
export default {
  name: "NewRequest",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonAccordion,
    IonDatetime,
    IonAccordionGroup,
  },
  data() {
    const d=new Date();
    const todayDate=d.getDate()+'-'+d.toString().substr(4,3)+'-'+d.getFullYear();
    return {
      userPreReqData: [],
      myDate:todayDate
    };
  },
  setup() {
    const router = useRouter();
    const accordionGroup = ref();
    const date = new Date();
    let month = '' +(date.getMonth()+1)
    if (month.length < 2) month = '0' + month;
    const currentDate=`${date.getFullYear()}-${month}-${date.getDate()}`;
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
      accordionGroup,
      closeAccordion,
      trashOutline,
      removeCircleOutline,
      logAccordionValue,
      addCircleOutline,
      currentDate,
    };
  },
  async beforeUpdate() {
    this.userPreReqData = (await getStore("userPreReqData")) || [];
  },
   methods: {
    async userRemoveProForNewReq(item) {
      this.userPreReqData = await getStore('userPreReqData') || [];
      console.log(this.userPreReqData)
      if(this.userPreReqData.length){
        const pos = this.userPreReqData.findIndex((p)=> p.id===item.id)
        if(pos > -1){
            this.userPreReqData.splice(pos,1);
            setStore('userPreReqData',this.userPreReqData);
            toastAlert(`${item.name} Product updated successfully`);
        }
      }
      
    },
    async userMakeRequest(){
      const userPreReqData=this.userPreReqData;
      const deliveryDate = new Date(this.myDate).getTime();
      const proItems=[];
      for(const [key, product]  of Object.entries(userPreReqData)){
        const maxQty=Number(product.qty);
        const cQty=Number(this.$refs['qty['+key+']'][0].value);
        if(cQty <=0 || cQty > maxQty){
          toastAlert(`Please verify your Qty`);
          return false;
        }
        product.qty=cQty;
        console.log(product);
        proItems.push(product);
        //removeStore
      }
      const res = await fgUserProRequestToAdmin(proItems,deliveryDate);
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
    padding: 10px 5px;
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
