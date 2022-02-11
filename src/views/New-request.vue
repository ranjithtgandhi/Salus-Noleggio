
<template>
  <ion-page>
    <!-- User -->
    <ion-content :fullscreen="true">
      <ExploreContainer name="New request page" />

      <div class="outerPadding">
        <div class="requstContainer">
          <div class="deliveryContainer">
            <div class="text-grey" style="padding: 0 10px 10px 10px;font-size:10px">
              Delivery date
            </div>
            <div class="ion-padding deliveryDate">
            <input type="date" placeholder="Please select date"></div>
          </div>
          <div class="goodsSelect" style="padding-top: 25px">
            <div class="text-grey" style="padding: 0 10px 10px 10px;font-size:10px">
              Select Goods
            </div>
            <div class="ion-border">
              <ion-accordion-group>
                <ion-accordion value="colors" :toggle-icon="arrowDownCircle">
                  <div slot="header">
                    <div class="plywood-invoice ion-border-bottom">Plywood</div>
                  </div>

                  <ion-list slot="content">
                    <p class="doc-subtitle text-grey">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ullam sed at ratione. Praesentium, totam nisi.
                    </p>
                    <ion-row class="ion-align-items-center" style="width: 100%">
                      <ion-col size="3">
                        <div class="quantity-text">Quantity:</div>
                      </ion-col>
                      <ion-col size="7">
                        <div class="ion-padding ion-border price">400</div>
                      </ion-col>
                      <ion-col size="2" class="ion-text-center">
                        <ion-icon :icon="trashOutline"></ion-icon>
                      </ion-col>
                    </ion-row>
                  </ion-list>
                </ion-accordion>
              </ion-accordion-group>
            </div>
          </div>
          <div class="ion-margin-top ion-border">
          <ion-row class="text-grey ion-align-items-center">
            <ion-col size="10" class="ion-no-padding">Add more goods</ion-col>
            <ion-col size="2" class="ion-text-center ion-no-padding"
              ><ion-icon :icon="addCircleOutline"></ion-icon
            ></ion-col>
          </ion-row>
        </div>
        </div>
        
        <div class="requestBtn">
          <div class="makeRequestBtn">Make request</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import ExploreContainer from "@/components/ExploreContainer.vue";
/* User module */
import {
  IonPage,
  IonContent,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";
import { ref } from "vue";
import {
  arrowDownCircle,
  trashOutline,
  addCircleOutline,
} from "ionicons/icons";
export default {
  name: "NewRequest",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonAccordion,
    IonAccordionGroup,
  },
  setup() {
    const accordionGroup = ref();
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
    return {
      arrowDownCircle,
      accordionGroup,
      closeAccordion,
      trashOutline,
      logAccordionValue,
      addCircleOutline,
    };
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
    padding: 10px 12px;
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
</style>