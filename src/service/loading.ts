import {loadingController } from "@ionic/vue";

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