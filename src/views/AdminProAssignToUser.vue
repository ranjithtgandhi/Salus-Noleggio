<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred ion-padding ion-text-center">
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
       
          <span v-for="(product,i) in filteredList" v-bind:key="product.id" >
            <ion-row class="ion-align-items-center ion-border-bottom py-5" :key="i">
              <ion-col size="9">
                <ion-card-title class="text-darkblue pb-5"
                  >{{ product.name }}
                  <span class="aqty-field">  <input class="ion-padding-horizontal" :model="`quantity[${i}]`"
                    :id="`quantity[${i}]`"
                    type="number" 
                    :name="`quantity[${i}]`"
                    placeholder="Qty"
                    :ref="`quantity[${i}]`"
                    required /> </span></ion-card-title
                >
                <ion-card-subtitle class="text-lightgrey">{{
                  product.description
                }}</ion-card-subtitle>
              </ion-col>
              <ion-col size="1.5" class="ion-text-center" @click="addItemToUser(userId,product,i)">
                <!-- @click="deleteItem(item.addedBy, item)" -->
                <ion-icon class="active" :icon="addCircleOutline"></ion-icon>
              </ion-col>
              <!-- <ion-col size="1.5" class="ion-text-center">
              <ion-icon class="delete" :icon="trashOutline"></ion-icon>
            </ion-col> -->
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
      userDetail: { items: [] },
      search: "",
      productList: { items: [] },
    };
  },
  setup() {
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
      const updateStatus = !status;
      await store.setUserStatus(updateStatus, userId);
      if (updateStatus === false) {
        router.push("/tabs/AdminUser/userPageTab");
      }
    };
   
    const returnToCompany = ()=>{
         router.push("/AdminProduct/"+userId);
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
        difference = this.productList.items;
      }

      return difference.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  async beforeMount() {
     const route = useRoute();
    const userId = route.params.id;
    this.userId = userId;
    this.userDetail = await fbGetUserDetail(userId);
    this.productList = await fbGetProductList();
  },
  async beforeUpdate() {
     const route = useRoute();
    const userId = route.params.id;
    this.userId = userId;
    this.userDetail = await fbGetUserDetail(userId);
    this.productList = await fbGetProductList();
    console.log(this.productList);
  },
  methods: {
    async addItemToUser(uid,item,inx){  
        const val = Number(this.$refs['quantity['+inx+']'][0].value) || 0 
        //this.$refs['quantity['+inx+']'][0].value
        if(val===0){
            toastAlert(`Please enter Quantity value`);
            return false;
        }
        const response = await fbAddItemToUser(uid, item,val);
        if (response) {
            toastAlert(`${item.name} Product successfully updated`);
        } else {
            toastAlert(`${item.name} Product updated filed`);
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
