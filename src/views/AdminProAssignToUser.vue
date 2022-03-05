<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred custom-ion-padding ion-text-center">
        Product Assign to Company
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
            placeholder="Search Item.."
            style="background: #fff"
          />
          {{ search }}
        </div>
       
          <div v-for="(product,i) in filteredList" v-bind:key="product.id"  class="ion-border-bottom py-5">
            <ion-row class="ion-align-items-center" :key="i">
              <ion-col size="7">
                <ion-card-title class="text-darkblue"
                  >{{ product.name }}
                  </ion-card-title>                
              </ion-col>
              <ion-col size="3">
              <span class="aqty-field">  <input class="ion-padding-horizontal" :model="`quantity[${i}]`"
                    :id="`quantity[${i}]`"
                    type="number" 
                    :name="`quantity[${i}]`"
                    placeholder="Qty"
                    :ref="`quantity[${i}]`"
                    required /> </span>
              </ion-col>
              <ion-col size="2" class="ion-text-center" @click="addItemToUser(userId,product,i)">
                <!-- @click="deleteItem(item.addedBy, item)" -->
                <ion-icon class="active" :icon="addCircleOutline"></ion-icon>
              </ion-col>
              <!-- <ion-col size="1.5" class="ion-text-center">
              <ion-icon class="delete" :icon="trashOutline"></ion-icon>
            </ion-col> -->
            </ion-row>
            <ion-row>
            <ion-col size="12">
                <ion-card-subtitle class="text-lightgrey" style="padding:6px 0px">{{
                      product.description
                    }}</ion-card-subtitle>
            </ion-col>
            </ion-row>
          </div>
       <span v-if="filteredList.length === 0">
          <ion-row class="ion-align-items-center ion-border-bottom py-5">
            <ion-col size="9">
              <ion-card-title class="text-darkblue pb-5">
              No Results Found!
              </ion-card-title>
            </ion-col>
          </ion-row>
        </span>
      </div>
      
       <div class="requstContainer ion-padding">
       <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="returnToCompany">
           Return to Company
          </div>
        </div> 
       </div>
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";

import { IonPage, IonContent } from "@ionic/vue";//, IonToggle
//import { onMounted } from "vue";
import {
  removeCircle,
  removeCircleOutline,
  documentTextSharp,
  logoWechat,
  trashOutline,
  addCircleOutline,
} from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import { defineComponent } from "vue"; //onUpdated
import {
 fbGetUserDetail,
  fbGetProductList,
 // fbProductFileUpload,
  fbAddItemToUser,
} from "../store/firebase";
import { toastAlert } from "../service/common";
import { useAuthStore } from "@/store";
export default defineComponent({
  name: "AdminProduct",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
   // IonToggle,
  },
  data() {
    return {
      loader : document.getElementById("loaderContainer"),
      userDetail: { items: [] },
      search: "",
      productList: { items: [] },
    };
  },
  setup() {
    const loader = document.getElementById("loaderContainer");
    const route = useRoute();
    const userId = route.params.id;
    const router = useRouter();
    const store = useAuthStore();
    // const [el] = this.$refs["element-1"];
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

    const doUserStatus = async (status) => {
      loader.style.display='block';
      const updateStatus = !status;
      await store.setUserStatus(updateStatus, userId);
      if (updateStatus === false) {
        router.push("/tabs/AdminUser/userPageTab");
      }loader.style.display='none';
    };
   
    const returnToCompany = ()=>{
        loader.style.display='block';
         router.push("/AdminProduct/"+userId);
        loader.style.display='none';
    }
    return {
      removeCircle,
      documentTextSharp,
      removeCircleOutline,
      addCircleOutline,
      logoWechat,
      userId,
     // addItemToUser,
      store,
      trashOutline,
      doUserStatus,
      returnToCompany
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
      if (this.userDetail && this.userDetail.items 
        && this.productList && this.productList.items && this.userDetail.items !== undefined) {
        difference = this.productList.items.filter((a) => {
          return !this.userDetail.items.some((b) => {
            return b.proId === a.id;
          });
        });
      } else {
        difference = this.productList.items || [];
      }
      return difference.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
      
    },
  },
  async beforeMount() {
    this.loader.style.display='block';
     const route = useRoute();
    const userId = route.params.id;
    this.userId = userId;
    this.userDetail = await fbGetUserDetail(userId);
    this.productList = await fbGetProductList();
       this.loader.style.display='none';
  },
  async beforeUpdate() {
      this.loader.style.display='block';
     const route = useRoute();
    const userId = route.params.id;
    this.userId = userId;
    this.userDetail = await fbGetUserDetail(userId);
    this.productList = await fbGetProductList();
    console.log(this.productList);
       this.loader.style.display='none';
  },
  methods: {
    async addItemToUser(uid,item,inx){  
      this.loader.style.display='block';
        const val = Number(this.$refs['quantity['+inx+']'][0].value) || 0 
        //this.$refs['quantity['+inx+']'][0].value
        if(val===0){
          this.loader.style.display='none';
          toastAlert(`Please enter Quantity value`);
          return false;
        }
        const response = await fbAddItemToUser(uid, item,val);
        if (response) {
            toastAlert(`${item.name} Product successfully updated`);
        } else {
            toastAlert(`${item.name} Product updated failed`);
        }
        this.userDetail = await fbGetUserDetail(uid);
        const productList = await fbGetProductList();
        let difference = [];
        if (this.userDetail && this.userDetail.items && this.userDetail.items !== undefined) {
            difference = productList.items.filter((a) => {
            return !this.userDetail.items.some((b) => {
                return b.proId === a.id;
            });
            });
        } else {
            difference = productList.items;
        }
        this.productList.items = difference;
        this.loader.style.display='none';
            //console.log(this.refs);
    }
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
