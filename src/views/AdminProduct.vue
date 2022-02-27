<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />
      <div class="title text-lightred ion-padding ion-text-center">
        {{ userDetail ? userDetail.company : "" }}
      </div>
      <div class="productContainer ion-padding">
        <!-- Active state -->
        <!--    <ion-row class="ion-align-items-center ion-border-bottom py-5">
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
        </ion-row> -->
        <span v-if="userDetail">
          <span v-for="item in userDetail.items" v-bind:key="item.name">
            <ion-row class="ion-align-items-center ion-border-bottom py-5">
              <ion-col size="9">
                <ion-card-title class="text-darkblue pb-5"
                  >{{ item.name }} <span> | {{ item.qty || 0 }} Qty</span></ion-card-title
                >
                <ion-card-subtitle class="text-lightgrey">{{
                  item.description
                }}</ion-card-subtitle>
              </ion-col>
              <!-- <ion-col
              size="1.5"
              class="ion-text-center"
              @click="deleteItem(item.addedBy, item)"
            >
              <ion-icon class="inactive" :icon="removeCircle"></ion-icon>
            </ion-col> -->
              <ion-col
                size="1.5"
                class="ion-text-center"
                @click="deleteItemFromUser(userId,item)"
              >
                <ion-icon class="delete" :icon="removeCircleOutline"></ion-icon>
              </ion-col>
            </ion-row>
          </span>
        </span>
      </div>

      <div class="requstContainer ion-padding">
       
        
         <div class="deliveryContainer ion-padding-bottom ion-margin-bottom">
          <div class="ion-padding deliveryDate ion-text-center" @click="addProTouser">
            Add Article
          </div>
        </div>
        <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex">
            Order &nbsp;<span class="yellowCircle">03</span>
          </div>
        </div>
        <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex">
            <ion-icon :icon="logoWechat"></ion-icon>&nbsp;Message &nbsp;<span
              class="redCircle"
              >02</span
            >
          </div>
        </div>
        <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex">
            <ion-icon :icon="documentTextSharp"></ion-icon>&nbsp;<input
              type="file"
              id="docFile"
              name="filename"
              @change="fileUpload($event)"
            /><!-- Attachment -->
          </div>
        </div>
        <div class="statusBar">
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <ion-col size="10"
              ><ion-label class="text-darkblue"
                >Customer status {{ userDetail ? userDetail.active : false }}</ion-label
              ></ion-col
            >
            <ion-col size="2"
              ><ion-toggle
                checked="userDetail.active"
                @ionChange="doUserStatus(userDetail ? userDetail.active : false)"
              ></ion-toggle
            ></ion-col>
          </ion-row>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";

import { IonPage, IonContent, IonToggle } from "@ionic/vue";
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
  //fbGetProductList,
  fbProductFileUpload,
  //fbAddItemToUser,
  fbDeleteItemFromUser
} from "../store/firebase";
import { toastAlert } from "../service/common";
import { useAuthStore } from "@/store";
export default defineComponent({
  name: "AdminProduct",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonToggle,
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
    const fileUpload = async ($event) => {
      console.log($event.target.files[0]);
      const response = await fbProductFileUpload($event.target.files[0]);
      if (response) {
        toastAlert("File successfully uploaded");
      } else {
        toastAlert("File uploaded filed");
      }
      document.getElementById("docFile").value = "";
    };
    const doUserStatus = async (status) => {
      const updateStatus = !status;
      await store.setUserStatus(updateStatus, userId);
      if (updateStatus === false) {
        router.push("/tabs/AdminUser/userPageTab");
      }
    };
    /* const addItemToUser = async (item) => {
      await fbAddItemToUser(userId, item);
    }; */
    
    const addProTouser = async () => {
      router.push("/AdminProAssignToUser/" + userId);
    };
    
    return {
      removeCircle,
      documentTextSharp,
      removeCircleOutline,
      addCircleOutline,
      logoWechat,
      userId,
      //addItemToUser,
      store,
      trashOutline,
      fileUpload,
      doUserStatus,
      addProTouser
    };
  },
  computed: {
/*     filteredList() {
      let difference = [];
      if (this.userDetail.items !== undefined) {
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
    }, */
  },
  async beforeMount() {
    const route = useRoute();
    const userId = route.params.id;
    this.userDetail = await fbGetUserDetail(userId);
    //this.productList = await fbGetProductList();
  },
  async beforeUpdate() {
    const route = useRoute();
    const userId = route.params.id;
  //  this.userId = userId;
    this.userDetail = await fbGetUserDetail(userId);
    //this.productList = await fbGetProductList();
    //console.log(this.productList);
  },
  methods: {
    async deleteItemFromUser(uid,item){
      const response = await fbDeleteItemFromUser(uid,item);
      if (response) {
            toastAlert(`${item.name} Product successfully updated`);
            this.userDetail = await fbGetUserDetail(uid,item);
        } else {
            toastAlert(`${item.name} Product updated filed`);
        }
      
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
.productContainer ion-icon.inactive {
  color: #abaebd;
}
.productContainer ion-icon.active {
  color: #1dba20;
}
.productContainer ion-icon.delete {
  color: #fc5a5f;
}
</style>
