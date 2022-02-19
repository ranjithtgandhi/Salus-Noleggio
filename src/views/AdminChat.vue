<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Chat Page"/>
      <div class="outerPadding">
        <ion-row v-for="(item,i) in getChats.messages" :key="i">
          <ion-col size="12">
            <div class="dateContainer">
              <div class="chatDate">
                {{ getDay(new Date(item[0].id)) }}
              </div>
            </div>
          </ion-col>
          <ion-col>
            <ion-row v-for="(chat,j) in item" :key="j">
              <ion-col :offset="chat.createdBy===getChats.id?0:3" size="9">
                <ion-card :class="chat.createdBy===getChats.id?`white-bg`:`rose-bg`">
                  <ion-card-subtitle>
                    {{ chat.message }}
                    <div style="font-size: 7px; text-align: end">
                      {{ formatTime(chat.id) }}
                    </div>
                  </ion-card-subtitle>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>

        </ion-row>

      </div>
      <!-- text area -->
      <div class="chatTextBox">
        <ion-row class="ion-align-items-center">
          <ion-col size="9.5">
            <ion-input
                class="ion-padding-start"
                name="name"
                type="text"
                placeholder="Type here..."
                v-model="message"
                ref="message"
            ></ion-input>
          </ion-col>
          <ion-col size="1">
            <ion-icon :icon="attachOutline" class="attachIcon"></ion-icon>
          </ion-col>
          <ion-col size="1.5">
            <ion-icon :icon="arrowForward" class="arrowIcon" @click="sendMessage"></ion-icon>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import {attachOutline, arrowForward} from "ionicons/icons";
import {useAuthStore} from "@/store";
import {ref} from "vue";
import state from "@/store/state"
import {mapGetters} from "vuex";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "@/store/firebase";

export default {
  name: "AdminChat",
  props: ['id'],
  components: {ExploreContainer, IonContent, IonPage},
  setup() {
    const authStore = useAuthStore();
    const message = ref("");
    return {
      attachOutline,
      arrowForward,
      authStore,
      message,
    };
  },
  computed: {
    ...mapGetters({
      getUserChats: 'getUserChats'
    }),
    getChats() {
      return this.getUserChats
    }
  },
  beforeMount() {
    this.getMessages();
  },
  methods: {
    async getMessages() {
      onSnapshot(doc(db, "messages", this.id), (doc) => {
        const chat = doc.data().chat.map((item) => {
          return {
            id: item.id,
            message: item.message,
            createdBy: item.createdBy,
            date: this.formatDate(new Date(item.id))
          }
        })
        const data = {
          createdAt: doc.data().createdAt,
          id: doc.data().id,
          messages: this.groupBy(chat, 'date')
        }
        state.commit("userChats", data)
      })
    },
    async sendMessage() {
      await this.authStore.adminSentMessage(this.message.value, this.id);
    },
    groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },
    formatDate(item) {
      let dt = new Date(item);
      const day = dt.getDate();
      const year = dt.getFullYear();
      dt = dt.toString();
      const strTime = dt.slice(4, 7) + " " + day + " " + year + " ";
      return strTime;
    },
    formatTime(item) {
      const date = new Date(item);
      let hours = Number(date.getHours());
      let minutes = Number(date.getMinutes());
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return hours + ":" + minutes + " " + ampm;
    },
    getDay(someDate) {
      const today = new Date()
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      const result = someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
      const result2 = someDate.getDate() === yesterday.getDate() &&
          someDate.getMonth() === yesterday.getMonth() &&
          someDate.getFullYear() === yesterday.getFullYear()
      if (result) return 'Today'
      else if (result2) return 'Yesterday'
      else return this.formatDate(someDate)
    }

  }
};
</script>
<style>

.font-weight {
  font-weight: 700;
}

.rose-bg {
  background: #f9eaee;
  margin: 0px 0px 18px 0px;
}

.white-bg {
  background: var(--ion-color-secondary-contrast, #ffffff);
}

.dateContainer {
  position: relative;
  color: var(--ion-color-medium);
  font-size: 12px;
  text-align: center;
}

.chatDate::before {
  content: "";
  background: rgb(171 174 188 / 50%);
  position: absolute;
  width: 30%;
  height: 1px;
  left: 30px;
  top: 50%;
}

.chatDate::after {
  content: "";
  background: rgb(171 174 188 / 50%);
  position: absolute;
  width: 30%;
  height: 1px;
  right: 30px;
  top: 50%;
}

ion-input {
  border: none;
}

.chatTextBox {
  --color: #000;
  box-shadow: 0px 0px 1px 2px #f9eaee;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
}

.attachIcon {
  color: var(--ion-color-primary);
  font-size: 24px;
}

.arrowIcon {
  color: #ffffff;
  /* --color: var(--ion-color-light-contrast,#ffffff); */
  background: var(--ion-color-primary);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
}
</style>