
<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred ion-padding ion-text-center">{{userDetail.company}}</div>
      <div class="productContainer ion-padding">

        <!-- Active state -->
        <ion-row class="ion-align-items-center ion-border-bottom py-5" >
          <ion-col size="9">
            <ion-card-title class="text-darkblue pb-5">Test product <span> | 2 Qty</span></ion-card-title>
            <ion-card-subtitle class="text-lightgrey">Lorem test dummy content </ion-card-subtitle>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center">
            <ion-icon class="active" :icon="removeCircle"></ion-icon>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center">
            <ion-icon class="delete" :icon="trashOutline"></ion-icon>
          </ion-col>
        </ion-row>


      <span v-for="item in userDetail.items" v-bind:key="item.name">
        <ion-row class="ion-align-items-center ion-border-bottom py-5" >
          <ion-col size="9">
            <ion-card-title class="text-darkblue pb-5">{{item.name}} <span> | {{item.quantity}} Qty</span></ion-card-title>
            <ion-card-subtitle class="text-lightgrey">{{item.description}}</ion-card-subtitle>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center" @click="deleteItem(item.addedBy,item)">
            <ion-icon class="inactive" :icon="removeCircle"></ion-icon>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center">
            <ion-icon class="delete" :icon="trashOutline"></ion-icon>
          </ion-col>
        </ion-row>

        
         </span>
      </div>

      <div class="requstContainer ion-padding">
        <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="addArticle">Add article</div>
        </div>
         <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex">Order &nbsp;<span class="yellowCircle">03</span></div>
        </div>
         <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex"><ion-icon :icon="logoWechat"></ion-icon>&nbsp;Message &nbsp;<span class="redCircle">02</span></div>
        </div>
         <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex"><ion-icon :icon="documentTextSharp"></ion-icon>&nbsp;Attachment</div>
        </div>
         <div class="statusBar">
            <ion-row class="ion-justify-content-between ion-align-items-center">
              <ion-col size="10"><ion-label class="text-darkblue">Customer status</ion-label></ion-col>
              <ion-col size="2"><ion-toggle checked="false"></ion-toggle></ion-col>
            </ion-row>
          </div>
      </div>
     
    </ion-content>
  </ion-page>
</template>

<script>

import ExploreContainer from "@/components/ExploreContainer.vue";

import {
  IonPage,
  IonContent
} from "@ionic/vue";
//import { onMounted } from "vue";
import {
  removeCircle,
  documentTextSharp,
  logoWechat,
  trashOutline
} from "ionicons/icons";
import { useRouter,useRoute } from "vue-router";
import { defineComponent,onUpdated} from 'vue';
import {fbGetUserDetail,fbDeleteItem } from "../store/firebase";
//import { useAuthStore } from "@/store"
export default defineComponent({
 name: "AdminProduct",
  components: {
    ExploreContainer,
    IonContent,
    IonPage
  },
  data() {
    return {
      userDetail: []// {"item":[{"name":"Testing","description":"test desc","quantity":"5"}]}
    };
  },
  setup() {
        const route = useRoute();
      const userId = route.params.id;
         const router = useRouter();
      
    //const accordionGroup = ref();
    
    /* const logAccordionValue = () => {
      if (accordionGroup.value) {
        console.log(accordionGroup.value.$el.value);
      }
    };
    const closeAccordion = () => {
      if (accordionGroup.value) {
        accordionGroup.value.$el.value = undefined;
      }
    }; */
 
    const deleteItem = async (uid,item)=>{
      const deleteResponse = await fbDeleteItem(uid,item);
      if(deleteResponse){
        router.push("/AdminProduct/"+userId);
      }
      
    }
    const addArticle = ()=>{
      router.push("/AddArticle/"+userId);
    }
    
     
    return {
      removeCircle,
      documentTextSharp,
    logoWechat, 
    addArticle,
      deleteItem,
      trashOutline
    };
  },
  async beforeMount() {
    const route = useRoute();
     const userId = route.params.id;
    this.userDetail = await fbGetUserDetail(userId);
  },
    async beforeUpdate() {
    const route = useRoute();
     const userId = route.params.id;
    this.userDetail = await fbGetUserDetail(userId);
  },
/*   async mounted(){
      const route = useRoute();
      const userId = route.params.id;
     this.userDetail = await fbGetUserDetail(userId);
      console.log("user detail",this.userDetail);
  } */
});
</script>

<style>
/* .customPadding {
  padding: 15px 10px;
} */
.text-darkblue span{
 color: var(--ion-color-secondary);
    font-weight: 700;
    font-size: 11px;
    padding-left: 6px;
}
/* Admin */
.productContainer ion-icon.inactive{
  color: #ABAEBD;
}
.productContainer ion-icon.active{
  color: #1dba20;
}
.productContainer ion-icon.delete{
  color: #fc5a5f;
}
</style>