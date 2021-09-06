<template>
  <div
    class="
      bg-white
      overflow-hidden
      shadow
      rounded-lg
      cursor-pointer
      ring-purple-800
    "
    :class="{
      'ring-4': selected,
      'bg-red-100': error,
    }"
  >
    <div class="px-4 py-5 sm:p-6 text-center">
      <dt class="text-sm font-medium text-gray-500 truncate">
        {{ ticker.name }} - USD
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        {{ formattedPrice }}
      </dd>
    </div>
    <div class="w-full border-t border-gray-200"></div>
    <button
      class="
        w-full
        flex
        items-center
        justify-center
        font-medium
        bg-gray-100
        px-4
        py-4
        sm:px-6
        text-md text-gray-500
        hover:text-gray-600 hover:bg-gray-200 hover:opacity-50
        transition-all
        focus:outline-none
      "
      @click.stop="$emit('delete', ticker)"
    >
      <svg-icon class="h-5 w-5" name="delete" />
      Удалить
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue-demi'
import { Ticker } from './ticker'

interface Props {
  selected?: boolean
  error?: boolean
  ticker: Ticker
}
const props = withDefaults(defineProps<Props>(), {
  selected: false,
  error: false,
})
defineEmits<{ (e: 'delete', ticker: Ticker): void }>()
const formattedPrice = computed(() => {
  if (props.ticker.price === 0) {
    return '-'
  }

  if (props.ticker.price < 1) {
    return props.ticker.price.toPrecision(3)
  }
  return props.ticker.price.toFixed(2)
})
</script>
