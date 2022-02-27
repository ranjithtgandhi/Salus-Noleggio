<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred ion-padding ion-text-center">
        User Product List
      </div>
      <div class="productAssignContainer ion-padding">
        <!-- <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="addArticle">
            Add article
          </div>
        </div> -->
        <div class="search-field">
          <ion-icon :icon="searchOutline" class="commonStyleIcon"></ion-icon>
          <input
            type="text"
            v-model="search"
            placeholder="Search Goods.."
            style="background: #fff"
          />
          {{ search }}
        </div>

        <span v-for="(product, i) in filteredList" v-bind:key="product.id">
          <ion-row  class="ion-align-items-center ion-border-bottom py-5" :key="i">
            <ion-col size="9">
              <ion-card-title class="text-darkblue pb-5"
                >{{ product.name }} |  Qty {{product.qty}}
                </ion-card-title>
              <ion-card-subtitle class="text-lightgrey">{{
                product.description
              }}</ion-card-subtitle>
            </ion-col>
            <ion-col
              size="1.5"
              class="ion-text-center"
              @click="userAddProForNewReq(product)"
            >
              <!-- @click="deleteItem(item.addedBy, item)" -->
              <ion-icon class="active" :icon="addCircleOutline"></ion-icon>
            </ion-col>
            <!-- <ion-col size="1.5" class="ion-text-center">
              <ion-icon class="delete" :icon="trashOutline"></ion-icon>
            </ion-col> -->
          </ion-row>
        </span>
      </div>
      <!-- <div class="requstContainer ion-padding">
        <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="returnToCompany">
            Return to Company
          </div>
        </div>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";

import { IonPage, IonContent } from "@ionic/vue"; //, IonToggle
//import { onMounted } from "vue";
import {
  removeCircle,
  removeCircleOutline,
  documentTextSharp,
  logoWechat,
  trashOutline,
  addCircleOutline,
} from "ionicons/icons";
//import { useRouter } from "vue-router";
import { defineComponent } from "vue"; //onUpdated
import {
  fbGetUserProductList,
} from "../store/firebase";
import { toastAlert } from "../service/common";
//import { useAuthStore } from "@/store";
import { setStore, getStore } from "../store/store";
export default defineComponent({
  name: "UserProductList",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    // IonToggle,
  },
  data() {
    return {
      userDetail: { items: [] },
      search: "",
      productList: { items: [] },
      userPreReqData:[],
    };
  },
  setup() {
  
    /* const router = useRouter();
    const store = useAuthStore(); */
    

  
    
    return {
      removeCircle,
      documentTextSharp,
      removeCircleOutline,
      addCircleOutline,
      logoWechat,
      // addItemToUser,
      //store,
      trashOutline,
    };
  },
  computed: { 
    /* filteredList() {
      return this.productList.items.filter((item) => {
           return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }, */
    filteredList() {
      let difference = [];
      if (
        this.userPreReqData &&
        this.userPreReqData.length &&
        this.productList &&
        this.productList.items
      ) {
        difference = this.productList.items.filter((a) => {
          return !this.userPreReqData.some((b) => {
            return b.proId === a.proId;
          });
        });
      } else {
        difference = this.productList.items;
      }

      return difference.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  async beforeMount() {
   
    this.userPreReqData = await getStore('userPreReqData') || [];
    this.productList = await fbGetUserProductList();
  },
  async beforeUpdate() {
    
    this.userPreReqData = await getStore('userPreReqData') || [];
    this.productList = await fbGetUserProductList();
    console.log(this.productList);
  },
  methods: {
    async userAddProForNewReq(item) {
      this.userPreReqData = await getStore('userPreReqData') || [];
      console.log(this.userPreReqData)
      this.userPreReqData.push(item);
      setStore('userPreReqData',this.userPreReqData);
      toastAlert(`${item.name} Product successfully updated`);
      //setStore('userPreReqData',)
      /* const response = await fbUserAddProForNewReq(item);
      if (response) {
        toastAlert(`${item.name} Product successfully updated`);
      } else {
        toastAlert(`${item.name} Product updated filed`);
      } */
      //this.userDetail = await fbGetUserProductDetail();
     /*  const productList = await fbGetUserProductList();
      this.productList.items  = productList.items.filter((a) => {
                            return item.userReq===false
                        }); */
      /* let difference = [];
      if (
        this.userDetail &&
        this.userDetail.items &&
        this.userDetail.items !== undefined
      ) {
        difference = productList.items.filter((a) => {
          return !this.userDetail.items.some((b) => {
            return b.proId === a.id;
          });
        });
      } else {
        difference = productList.items; 
      }
      this.productList.items = difference;*/
      
      //console.log(this.refs);
    },
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
.productAssignContainer ion-icon.inactive {
  color: #abaebd;
}
.productAssignContainer ion-icon.active {
  color: #1dba20;
}
.productAssignContainer ion-icon.delete {
  color: #fc5a5f;
}
</style>
