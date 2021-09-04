<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            id="wallet"
            v-model="ticker"
            type="text"
            name="wallet"
            class="
              block
              w-full
              p-2
              mt-2
              pr-10
              border-gray-300
              text-gray-900
              focus:outline-none focus:ring-gray-500 focus:border-gray-500
              sm:text-sm
              rounded-md
            "
            placeholder="Например DOGE"
            @keydown.enter="add"
            @input="handleInput"
          />
        </div>
        <div
          v-if="getHints && ticker.length > 0"
          class="flex bg-white shadow-md p-1 rounded-md flex-wrap"
        >
          <span
            v-for="hint in hints"
            :key="hint"
            class="
              inline-flex
              items-center
              px-2
              m-1
              rounded-md
              text-xs
              font-medium
              bg-gray-300
              text-gray-800
              cursor-pointer
            "
            @click="hintClick(hint)"
          >
            {{ hint }}
          </span>
        </div>
        <div v-if="tickerExists" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>

    <add-button @click="add" />
  </section>
</template>

<script>
import AddButton from './AddButton.vue'

export default {
  components: {
    AddButton,
  },
  props: {
    getHints: {
      type: Function,
      required: false,
      default: null,
    },
    checkTicker: {
      type: Function,
      required: false,
      default: null,
    },
  },
  emits: {
    'add-ticker': function (v) {
      return typeof v === 'string' && v.length > 0
    },
  },
  data() {
    return {
      ticker: '',
    }
  },
  computed: {
    hints() {
      return this.getHints(this.ticker)
    },
    tickerExists() {
      return this.checkTicker && this.checkTicker(this.ticker)
    },
  },
  methods: {
    add() {
      if (this.ticker.length === 0) {
        return
      }

      this.$emit('add-ticker', this.ticker)
      this.ticker = ''
    },
    hintClick(hint) {
      this.ticker = hint
      this.add()
    },
    handleInput() {
      this.ticker = this.ticker.toUpperCase()
    },
  },
}
</script>
