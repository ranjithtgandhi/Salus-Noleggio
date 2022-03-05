<template>
  <ion-page>
    <ion-content>
      <div class="listOfContainer">
        <!-- Default Searchbar -->
        <!-- <ion-searchbar v-model="search" ></ion-searchbar> -->
        <div class="search-field">
          <ion-icon :icon="searchOutline" class="commonStyleIcon"></ion-icon>
          <input
            type="text"
            v-model="search"
            placeholder="Search title.."
            style="background: #fff"
          />
          {{ search }}
        </div>

        <span v-if="authStore.activeCompUsers">
          <span v-for="user in filteredList" v-bind:key="user.id">
            <ion-row
              class="ion-border-bottom ion-align-items-center"
              v-if="user.active === true && user.admin === false"
              @click="companySelect(user.uid)"
            >
              <ion-col size="11" class="text-darkblue">{{ user.company }}</ion-col>
              <ion-col size="1" class="ion-text-center"
                ><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
              ></ion-col>
            </ion-row>
          </span>
        </span>
        <!-- <ion-button @click="presentLoading">Test Loading</ion-button> -->
        <!-- <ion-row class="ion-border-bottom ion-align-items-center">
            <ion-col size="11" class="text-darkblue">MY TEST</ion-col>
            <ion-col size="1" class="ion-text-center"><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
            ></ion-col>
          </ion-row>
          <ion-row class="ion-border-bottom ion-align-items-center">
            <ion-col size="11" class="text-darkblue">Company&nbsp;03</ion-col>
           <ion-col size="1" class="ion-text-center"><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
            ></ion-col>
          </ion-row>
          <ion-row class="ion-border-bottom ion-align-items-center">
            <ion-col size="11" class="text-darkblue">Company&nbsp;04</ion-col>
           <ion-col size="1" class="ion-text-center"><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
            ></ion-col>
          </ion-row>
          <ion-row class="ion-border-bottom ion-align-items-center">
            <ion-col size="11" class="text-darkblue">Company&nbsp;05</ion-col>
            <ion-col size="1" class="ion-text-center"><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
            ></ion-col>
          </ion-row>
          <ion-row class="ion-border-bottom ion-align-items-center">
            <ion-col size="11" class="text-darkblue">Company&nbsp;06</ion-col>
           <ion-col size="1" class="ion-text-center"><ion-icon class="icon-grey" :icon="chevronForwardOutline"></ion-icon
            ></ion-col>
          </ion-row> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue"; //IonSearchbar
import { searchOutline, chevronForwardOutline } from "ionicons/icons";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";
import { IonPage, onIonViewWillEnter } from "@ionic/vue";
export default defineComponent({
  components: { IonPage }, //IonSearchbar

  props: {
    timeout: { type: Number, default: 2000 },
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    onIonViewWillEnter(async () => {
      if (!authStore.isAdmin) {
        router.push("/tabs/UserHome");
      }
      /* if(!authStore.activeCompUsers){
        await authStore.getAllActiveComUsers();
        console.log(authStore.activeCompUsers);
      } */
      console.log("Home page will enter");
    });
    const companySelect = function (id) {
      router.push("/AdminProduct/" + id);
    };

    return {
      authStore,
      searchOutline,
      companySelect,
      chevronForwardOutline,
    };
  },
  beforeMount() {
    //console.log("THis is Before Mount")
    /* const authStore = useAuthStore();
     const router = useRouter(); 
    if(!authStore.isAdmin){
        router.push("/tabs/UserHome");
      }  */
  },
  data() {
    return {
      loader:document.getElementById("loaderContainer"),
      search: "",
      userlist: [],
    };
  },
  computed: {
    filteredList() {
      return this.userlist.filter((user) => {
        return user.company.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  async updated(){
    this.loader.style.display='block';
    const authStore =  useAuthStore();
    await authStore.getAllActiveComUsers();
    this.userlist = authStore.activeCompUsers;
    this.loader.style.display='none';
    console.log("This is the array data", this.userlist);
  },
  methods: {
 
  },
});
</script>
<style>
.font-weight {
  font-weight: 700;
}

.listOfContainer {
  padding: 6px 16px;
}
</style>
