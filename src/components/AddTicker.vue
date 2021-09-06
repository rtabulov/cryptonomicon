<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <app-input
            id="wallet"
            v-model="ticker"
            type="text"
            name="wallet"
            placeholder="Например DOGE"
            @keydown.enter="add"
          />
        </div>
        <div
          v-if="ticker.length > 0 && hints"
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

    <app-button class="mt-4" @click="add">
      <svg-icon class="-ml-0.5 mr-2 h-6 w-6" name="add" />
      Добавить
    </app-button>
  </section>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch, watchEffect } from 'vue'

const props = defineProps({
  getHints: {
    type: Function as PropType<(prop: string) => string[]>,
    default: null,
  },
  checkTicker: {
    type: Function as PropType<(prop: string) => boolean>,
    default: () => true,
  },
})
const emit = defineEmits({ addTicker: String })

const ticker = ref('')
watch(ticker, (value) => {
  ticker.value = value.toUpperCase()
})

//   computed: {
const hints = computed(() => props.getHints && props.getHints(ticker.value))
const tickerExists = computed(
  () => props.checkTicker && props.checkTicker(ticker.value),
)
function add() {
  if (ticker.value.length === 0) {
    return
  }

  emit('addTicker', ticker.value)
  ticker.value = ''
}
function hintClick(hint: string) {
  ticker.value = hint
  add()
}
</script>
