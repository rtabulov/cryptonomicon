<template>
  <input
    class="
      block
      relative
      shadow-md
      w-60
      pr-10
      p-2
      border-gray-300
      text-gray-900
      focus:outline-none focus:ring-gray-500 focus:border-gray-500
      sm:text-sm
      rounded-md
    "
    :value="modelValue"
    @input="onInput"
  />
</template>
<script lang="ts" setup>
defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
