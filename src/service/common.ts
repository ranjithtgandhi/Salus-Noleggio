import {loadingController,toastController } from "@ionic/vue";

export const presentLoading = async (isLoading: any) => {
    console.log('loading')
      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 100,
        })
        .then(load=> {
            if(isLoading){
                load.present();
             }else{
                 load.dismiss()
             }
        });
        
     
};


export const toastAlert = async(msg: string) =>{
  const toast = await toastController
    .create({
      message: msg,
      duration: 2000,
      color:"dark"
    })
  return toast.present();
};