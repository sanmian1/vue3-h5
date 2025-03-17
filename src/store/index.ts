// src/store/index.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    async fetchUserInfo() {
      const { data } = await getUserInfo({});
      this.userInfo = data;
    },
  },
});