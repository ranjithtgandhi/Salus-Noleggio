<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Product List" />
   <div class="title text-lightred ion-padding ion-text-center">Products</div>
      <div class="productListContainer ion-padding">
     
       <!--  <ion-row class="ion-align-items-center ion-border-bottom py-5">
          <ion-col size="9">
            <ion-card-title class="text-darkblue pb-5"
              >Test product <span> | 2 Qty</span></ion-card-title
            >
            <ion-card-subtitle class="text-lightgrey"
              >Lorem test dummy content
            </ion-card-subtitle>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center">
            <ion-icon class="active" :icon="removeCircle"></ion-icon>
          </ion-col>
          <ion-col size="1.5" class="ion-text-center">
            <ion-icon class="delete" :icon="trashOutline"></ion-icon>
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
        </ion-row> -->

        <span v-if="productList.items.length !== 0">
          <span v-for="item in productList.items" v-bind:key="item.id">
            <ion-row class="custom-border-bottom">
              <ion-col size="8.5">
                <ion-card-title class="text-lightred">{{ item.name }}</ion-card-title>
                <ion-card-subtitle class="text-lightgrey">{{
                  item.description
                }}</ion-card-subtitle>
              </ion-col>
              <!-- <ion-col size="2" offset="1.5" class="ion-text-center custom-border">
                <ion-card-title class="text-lightred">{{ item.quantity }}</ion-card-title>
                <ion-card-subtitle class="text-lightgrey">Qty</ion-card-subtitle>
              </ion-col> -->
            </ion-row>
          </span>
        </span>
        <span v-if="productList.items.length === 0">
          <ion-row class="ion-align-items-center ion-border-bottom py-5">
            <ion-col size="9">
              <ion-card-title class="text-darkblue pb-5">
              No Records Found!
              </ion-card-title>
            </ion-col>
          </ion-row>
        </span>
      </div>

      <div class="requstContainer ion-padding">
        <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="addArticle">
            Add Product
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";

import { IonPage, IonContent } from "@ionic/vue";
//import { onMounted } from "vue";
import {
  removeCircle,
  documentTextSharp,
  logoWechat,
  trashOutline,
} from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, onUpdated } from "vue";
import { fbGetProductList, fbDeleteAdminItem } from "../store/firebase";
//import { useAuthStore } from "@/store"
export default defineComponent({
  layout: "Product List",
  name: "AdminProductList",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
  },
  data() {
    return {
      productList: { items: [] }, // {"item":[{"name":"Testing","description":"test desc","quantity":"5"}]}
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

    const deleteAdminItem = async (uid, item) => {
      const deleteResponse = await fbDeleteAdminItem(uid, item);
      if (deleteResponse) {
        router.push("/AdminProduct/" + userId);
      }
    };
    const addArticle = () => {
      router.push("/AdminAddArticle"); ///" + userId
    };

    return {
      removeCircle,
      documentTextSharp,
      logoWechat,
      addArticle,
      deleteAdminItem,
      trashOutline,
    };
  },
  /* async beforeMount() {
    this.productList = await fbGetProductList();
    console.log(this.productList)
  }, */
  async beforeUpdate() {
    this.productList = await fbGetProductList();
    console.log(this.productList);
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
.text-darkblue span {
  color: var(--ion-color-secondary);
  font-weight: 700;
  font-size: 11px;
  padding-left: 6px;
}
/* Admin */
.productContainer ion-icon.inactive {
  color: #abaebd;
}
.productContainer ion-icon.active {
  color: #1dba20;
}
.productContainer ion-icon.delete {
  color: #fc5a5f;
}
.custom-border-bottom {
  border-bottom: 1px solid rgb(248 95 99 / 30%);
  margin-bottom: 6px;
  padding-bottom: 6px;
}
</style>
