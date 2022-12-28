import { defineStore } from 'pinia'

export const usePinia = defineStore('Pinia', {
  state: () => ({
    message: 'Hello Pinia',
  }),
  getters: {},
  actions: {},
})
