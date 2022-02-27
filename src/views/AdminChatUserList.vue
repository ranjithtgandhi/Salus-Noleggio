<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Chat User List"/>

      <div class="outerPadding">
        <div class="chatAdminContainer" v-for="(item,i) in getList" :key="i">
          <router-link :to="`/tabs/AdminChat/${item.uid}`">
            <ion-card>
              <ion-row class="ion-align-items-center">
                <ion-col size="1.5" class="ion-text-center">
                  <div class="redCircle">{{ i + 1 }}</div>
                </ion-col>
                <ion-col size="10.5">
                  <ion-card-title class="text-darkblue pb-5">{{item.company}}</ion-card-title>
<!--                  <ion-card-subtitle class="text-lightgrey">-->
<!--                    Metal rods of cast iron materials with..-->
<!--                  </ion-card-subtitle>-->
                </ion-col>
              </ion-row>
            </ion-card>
          </router-link>
        </div>
      </div>
    </ion-content>

  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonCard} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import {db} from "@/store/firebase";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import state from "@/store/state";
import {mapGetters} from "vuex";
export default {
  name: "AdminChatUserList",
  components: {
    ExploreContainer,
    IonContent,
    IonPage,
    IonCard,
  },
  setup() {
    const msgList = []
    return {
      msgList,
    };
  },
  computed: {
    ...mapGetters({
      getMessageList: 'getMessageList'
    }),
    getList() {
      return this.getMessageList
    }
  },
  beforeMount() {
    this.getUsersMessageList();
  },
  methods: {
    async getUserDetail(uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.msgList.push(docSnap.data());
        state.commit("messageList", this.msgList)
      } else return {}
    },
    async getUsersMessageList() {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const msg = []
      await querySnapshot.forEach((doc) => {
        // const id = doc.data().id
        // const data = this.getUserDetail(id)
        // console.log(data)
        // msg.push(this.getUserDetail(id))
        msg.push(doc.data().id)
      });
      msg.forEach(item => {
        this.getUserDetail(item)
      })
      state.commit("messageList", msg)
    },
  }
};
</script>
<style>
/* Admin start */
ion-select {
  width: 100%;
  color: #1DBA20;
  font-size: 14px;
  text-align: center;
  border: 1px solid rgb(171 174 188 / 50%);
  padding: 6px 15px 6px 5px;
  border-radius: 4px;
  margin-right: 0px;
}
ion-select label {
  color: #1dba20;
}
.font-size {
  font-size: 22px;
}
.userHomePage {
  font-family: "Spartan-semibold";
}
.item.sc-ion-label-ios-h,
.item .sc-ion-label-ios-h {
  color: #1bab1d;
  font-size: 12px;
}
/* Admin end */
</style>