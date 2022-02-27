<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred ion-padding ion-text-center">Add Product</div>
      <div class="outerPadding">
     
        
           <div class="ion-padding error-msg" v-if="authStore.error">{{ authStore.error }}</div>
        <div class="inputfieldContainer">
          <div class="text-grey">Product Name</div>
          <input
            class="ion-padding-horizontal"
           v-model="productName"
                    id="productName"
                    type="text"
                    placeholder="Product Name"
                    required
          />
        </div>
        <div class="inputfieldContainer">
          <div class="text-grey">Description</div>
          <textarea
            rows="4"
            cols="30"
            form="usrform"
            v-model="description"
            id="description"
            type="text"
            placeholder="Description"
            required
          ></textarea>
        </div>
        <!-- <div class="inputfieldContainer">
          <div class="text-grey">Quantity</div>
          <input class="ion-padding-horizontal" v-model="quantity"
                    id="quantity"
                    type="number"
                    placeholder="Quantity"
                    required />
        </div> -->
        <div class="requestBtn" style="margin-top:15px">
        <div class="ion-padding makeRequestBtn ion-text-center"   @click="doCreateProduct" >Submit</div>
        </div>
      </div>

      
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";
/* User module */
import { IonPage, IonContent} from "@ionic/vue";
import { useAuthStore } from "@/store";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";//,useRoute
//import {fbCreateProduct} from "../store/firebase.ts";
export default defineComponent({
  name: "AdminAddArticle",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    
  },
  setup() {
    //const route = useRoute();
    const authStore = useAuthStore();
    //const userId = route.params.id;
    const router = useRouter();
    const productName = ref("");
    const description = ref("");
    //const quantity = ref("");
    //console.log(route.params.id); 
    
    const doCreateProduct = async() => {
      const response =  await authStore.createProduct(productName.value,description.value);//userId,,Number(quantity.value)
        if(response){
          router.replace("/tabs/AdminProductList");//+userId
        }
    };
    return {
      productName,
      description,
      doCreateProduct,
      authStore,
      //quantity,
    };
  },
  methods: {
    /* acceptUser(uid){
      const authStore = useAuthStore();
      this.uid = uid
      console.log(uid);
      authStore.setInActiveComUser(uid);
    } */
  },
});
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
  padding: 10px 12px;
}
.text-darkblue span {
  color: var(--ion-color-secondary);
  font-weight: 700;
  font-size: 11px;
  padding-left: 6px;
}
/* Admin */
.productContainer ion-icon {
  color: #abaebd;
}
</style>
