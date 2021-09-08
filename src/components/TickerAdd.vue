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
            @click="onHintClick(hint)"
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
import { useStore } from '@/store/store'
import { computed, PropType, ref, watch } from 'vue'

const props = defineProps({
  checkTicker: {
    type: Function as PropType<(prop: string) => boolean>,
    default: () => true,
  },
})
const emit = defineEmits<{ (e: 'addTicker', value: string): void }>()

const { cryptoObject } = useStore()
const ticker = ref('')

watch(ticker, (value) => {
  ticker.value = value.toUpperCase()
})

const hints = computed(() => getHints(ticker.value))
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
function onHintClick(hint: string) {
  ticker.value = hint
  add()
}
function getHints(ticker: string): string[] {
  const res = Object.keys(cryptoObject)
    .filter(
      (coin) =>
        coin.includes(ticker) ||
        cryptoObject[coin].FullName.toUpperCase().includes(ticker),
    )
    .slice(0, 4)
  return res
}
</script>
