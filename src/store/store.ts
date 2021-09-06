import { CryptoObject } from '@/components/ticker'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('global', {
  state: () => ({
    cryptoObject: {} as CryptoObject,
  }),

  actions: {
    async loadCryptoObject() {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/all/coinlist?summary=true',
        { timeout: 5000 },
      )
      this.cryptoObject = response.data.Data as CryptoObject
      return this.cryptoObject
    },
  },
})
