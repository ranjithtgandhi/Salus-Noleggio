<template>
  <ion-page>
    <ion-content>
      <!-- Approval tab content authStore.inActiveCompUsers-->
      <div class="approvalContainer">
        <span v-if="authStore.inActiveCompUsers">
          <span v-for="user in authStore.inActiveCompUsers" v-bind:key="user.id">
            <ion-card v-if="user.active === false && user.admin === false">
              <ion-row class="ion-align-items-center">
                <ion-col size="5">
                  <div class="text-darkblue">{{ user.company }}</div>
                </ion-col>
                <ion-col size="3.5" class="ion-text-center">
                  <div class="redCustomBtn customPadding">Reject</div>
                </ion-col>
                <ion-col size="3.5" class="ion-text-center">
                  <!--  {{Newuid}} -->
                  <div class="greenCustomBtn customPadding" @click="acceptUser(user)">
                    Accept
                  </div>
                </ion-col>
              </ion-row>
            </ion-card>
          </span>
        </span>
        <!--    <ion-card>
            <ion-row class="ion-align-items-center">
              <ion-col size="5">
                <div class="text-darkblue">Company 01</div>
              </ion-col>
              <ion-col size="3.5" class="ion-text-center">
                <div class="redCustomBtn customPadding">Reject</div>
              </ion-col>
              <ion-col size="3.5" class="ion-text-center">
                <div class="greenCustomBtn customPadding">Accept</div>
              </ion-col>
            </ion-row>
          </ion-card> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { mailOpenOutline, lockClosedOutline, eyeOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import { IonPage,onIonViewWillEnter,alertController} from "@ionic/vue";
export default defineComponent({
  components: { IonPage },
  setup() {
    //mount,
    //data,
    //computed
    const loader = document.getElementById("loaderContainer");
    const router = useRouter();
    const authStore = useAuthStore(); //debugger;
    //  const router = useRouter();
    // let inActiveCompUsers=null;
    loader.style.display='block';
    onIonViewWillEnter(async () => {
      if (!authStore.isAdmin) {
        router.replace("/tabs/UserHome");
      }
      await authStore.getAllInActiveComUsers();
      loader.style.display='none';
      console.log(authStore.inActiveCompUsers);
    });
    const acceptUser = async (user) => {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        subHeader: `Are you sure do you want approve "${user.company}" user?`,
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",/* 
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            }, */
          },
          {
            text: "Yes",
            id: "confirm-button",
            handler: async() => {
              const loader = document.getElementById("loaderContainer");
              loader.style.display='block';
              const res = await authStore.setInActiveComUser(user.uid);
              if (res) {
                router.replace("/tabs/AdminUser/userPageTab");
              }
              loader.style.display='none';
            },
          },
        ],
      });
      return alert.present();
    };
    /* if(!authStore.inActiveCompUsers){
      onMounted( async() => {
        await authStore.getAllInActiveComUsers();
        console.log(authStore.inActiveCompUsers)
      })
    } */
    return {
      acceptUser,
      authStore,
      mailOpenOutline,
      lockClosedOutline,
      eyeOutline,
    };
  },
  /* data(){
    return {
      uid : ''
    };
  },
  mounted(){
     const authStore = useAuthStore();
     console.log(authStore.inActiveCompUsers)
  },
  computed:{

    Newuid: function (){
 const authStore = useAuthStore();
    console.log(authStore.inActiveCompUsers)
    return this.uid
    }
    
      ///Anythin in the computed 
  },
  methods: {
    acceptUser(uid){
      const authStore = useAuthStore();
      this.uid = uid
      console.log(uid);
      authStore.setInActiveComUser(uid);
    }
  }, */
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
