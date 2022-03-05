<template>
  <ion-page>
    <!-- User -->
   <ion-content :fullscreen="true">     
      <ExploreContainer name="Document page" />

      <div class="outerPadding">
       <div class="deliveryContainer ion-padding-bottom">
          <div class="ion-padding deliveryDate ion-text-center custom-d-flex">
            <ion-icon :icon="documentTextSharp"></ion-icon>&nbsp;<input
              type="file"
              id="docFile"
              name="filename"
              @change="fileUpload($event)"
            /> 
          </div>
        </div>
      <ion-card>
        <ion-row>
          <ion-col size="12">
            <ion-card-title class="plywood-invoice">Plywood Invoice</ion-card-title>
            <ion-card-subtitle class="doc-subtitle"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu consequat tortor volutpat.</ion-card-subtitle
            >
          </ion-col>
        </ion-row>
        <ion-row class="custom-border-top">
          <ion-col size="7">
            <div class="text-subdarkblue font-weight">Created on: 14 Oct 2021</div>
          </ion-col>
          <ion-col size="5" class="ion-text-center">
            <div class="text-blue">Download Attachment</div>|<div class="text-red">Delete</div>
          </ion-col>
        </ion-row>
      </ion-card>
      <ion-card>
        <ion-row>
          <ion-col size="12">
            <ion-card-title class="plywood-invoice">Plywood Invoice</ion-card-title>
            <ion-card-subtitle class="doc-subtitle"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu consequat tortor volutpat.</ion-card-subtitle
            >
          </ion-col>
        </ion-row>
        <ion-row class="custom-border-top">
          <ion-col size="7">
            <div class="text-subdarkblue font-weight">Created on: 14 Oct 2021</div>
          </ion-col>
          <ion-col size="5" class="ion-text-center">
            <div class="text-blue">Download Attachment</div>
          </ion-col>
        </ion-row>
      </ion-card>
      <ion-card>
        <ion-row>
          <ion-col size="12">
            <ion-card-title class="plywood-invoice">Plywood Invoice</ion-card-title>
            <ion-card-subtitle class="doc-subtitle"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu consequat tortor volutpat.</ion-card-subtitle
            >
          </ion-col>
        </ion-row>
        <ion-row class="custom-border-top">
          <ion-col size="7">
            <div class="text-subdarkblue font-weight">Created on: 14 Oct 2021</div>
          </ion-col>
          <ion-col size="5" class="ion-text-center">
            <div class="text-blue">Download Attachment</div>
          </ion-col>
        </ion-row>
      </ion-card>
      <ion-card>
        <ion-row>
          <ion-col size="12">
            <ion-card-title class="plywood-invoice">Plywood Invoice</ion-card-title>
            <ion-card-subtitle class="doc-subtitle"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget velit nunc. Aliquam tempus elit sit amet erat maximus, eu consequat tortor volutpat.</ion-card-subtitle
            >
          </ion-col>
        </ion-row>
        <ion-row class="custom-border-top">
          <ion-col size="7">
            <div class="text-subdarkblue font-weight">Created on: 14 Oct 2021</div>
          </ion-col>
          <ion-col size="5" class="ion-text-center">
            <div class="text-blue">Download Attachment</div>
          </ion-col>
        </ion-row>
      </ion-card>
      </div>
     
    </ion-content>
  </ion-page>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import {
  fbProductFileUpload,
  fbGetAllProDocFiles,
} from "../store/firebase";
import { toastAlert } from "../service/common";
import { IonPage, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { chevronForwardOutline } from "ionicons/icons";
export default {
  name: "AdminAddDocument",
  components: { ExploreContainer, IonContent, IonPage },
  data() {
     const route = useRoute();
    return {
      userId:route.params.id,
      proDocFiles:[],

    };
  },
  setup() {
    return {
      chevronForwardOutline,
    };
  },
   async beforeMount() {
     console.log('beforeMount',this.userId);
    this.proDocFiles = await fbGetAllProDocFiles(this.userId);
    //this.productList = await fbGetProductList();
    console.log(this.proDocFiles);
  },
  async beforeUpdate() {
    console.log('beforeUpdate',this.userId);
    //  this.userId = userId;
   this.proDocFiles = await fbGetAllProDocFiles(this.userId);
    //this.productList = await fbGetProductList();
    console.log(this.proDocFiles);
  },
  methods: { 
    async fileUpload($event){//fbGetAllProductFiles
    debugger
    const loader = document.getElementById("loaderContainer");
    loader.style.display='block';
      console.log('methods',this.userId);
      console.log($event.target.files[0]);
      const response = await fbProductFileUpload($event.target.files[0],this.userId);
      this.proDocFiles = await fbGetAllProDocFiles(this.userId);
      //console.log(this.proDocFiles);
      loader.style.display='none';
      if (response) {
        toastAlert("File successfully uploaded");
      } else {
        toastAlert("File uploaded filed");
      }
      document.getElementById("docFile").value = "";
    }
  }
};
</script>
<style>
.font-weight {
  font-weight: 700;
}

</style>