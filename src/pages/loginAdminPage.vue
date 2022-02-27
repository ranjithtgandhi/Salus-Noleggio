<template>
  <ion-page>
    <form>
      <ion-grid>
        <ion-row color="primary" justify-content-center>
          <ion-col size-xs="12">
            <div>
              <h3>Login</h3>
            </div>
            <div class="ion-padding error-msg" v-if="store.error">{{ store.error }}</div>
            <div padding>
              <div class="custom-padding-vertical">
                <div class="dflex-border">
                  <ion-icon :icon="mailOpenOutline" class="commonStyleIcon"></ion-icon>
                  <ion-input
                    class="ion-padding-horizontal"
                    v-model="email"
                    name="email"
                    id="email"
                    type="text"
                    placeholder="Email id"
                    required
                  ></ion-input>
                </div>
              </div>
              <div class="custom-padding-vertical">
                <div class="dflex-border">
                  <ion-icon :icon="lockClosedOutline" class="commonStyleIcon"></ion-icon>
                  <ion-input
                    class="ion-padding-horizontal"
                    v-model="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  ></ion-input>
                  <ion-icon :icon="eyeOutline" class="commonStyleIcon"></ion-icon>
                </div>
              </div>
              <ion-row class="choice">
                <ion-col size-sm="6" class="remember">
                  <ion-checkbox class="checkbox-square"></ion-checkbox
                  ><span>Remember me</span>
                </ion-col>
                <ion-col size-sm="6" class="lightred-text forgot-password ion-text-end">
                  <router-link to="/forgot">Forgot password?</router-link>
                </ion-col>
              </ion-row>
            </div>
          </ion-col>
          <ion-col size-xs="12" class="ion-text-center">
            <div class="ion-padding-bottom">
              <ion-button class="common-btn" size="large" @click="doLogin" expand="block"
                >Login</ion-button
              >
            </div>
            <!--<div class="account">Don’t have an account?</div>
           <div class="lightred-text"><span class="cursor-pointer"><router-link to="/signup">Sign up now</router-link></span></div> -->
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
  </ion-page>
</template>

<script>
import { IonPage,IonInput, IonButton } from "@ionic/vue";
import { useAuthStore } from "@/store";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { mailOpenOutline, lockClosedOutline, eyeOutline } from "ionicons/icons";
import $ from "jquery";

export default defineComponent({
  components: { IonPage,IonInput, IonButton },
  layout: "AdminLogin",
  name: "AdminLogin",
  setup() {
     const loader = document.getElementById("loaderContainer");
    const store = useAuthStore();
    const { logInUser } = store;
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const doLogin = async function(){
      loader.style.display='block';
      //console.log($);
      const res = await logInUser(email.value, password.value,'admin');
      if(res && store.isAdmin){
        router.push('/tabs/AdminHome');
        loader.style.display='none';
        return false;
      }
    };
    return {
      email,
      password,
      doLogin,
      store,
      mailOpenOutline,
      lockClosedOutline,
      eyeOutline,
    };
  },
});
</script>
