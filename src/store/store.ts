import { Storage } from '@capacitor/storage';
//https://www.joshmorony.com/using-the-capacitor-storage-api-for-storing-data/


  export async function setString(key: string, value: string) {
      await Storage.set({ key, value });
  }

  export async function getString(key: string): Promise<{ value: any }> {
      return (await Storage.get({ key }));
  }

  export async function setStore(key: string, value: any) {
      await Storage.set({ key, value: JSON.stringify(value) });
  }

  export async function getStore(key: string): Promise<{ value: any }> {
      const data = await Storage.get({ key }) as any;
      return JSON.parse(data.value);
  }


  export async function removeStore(key: string) {
      await Storage.remove({ key });
  }

  export async function clearStore() {
      await Storage.clear();
  }


