<template>
  <div
    class="
      fixed
      opacity-80
      text-center
      bg-purple-800
      inset-0
      z-50
      flex flex-col
      items-center
      justify-center
      text-white
    "
  >
    <h1 class="text-2xl mx-16 mb-4">
      Coin list fetch failed. Try reloading this page.
    </h1>
    <pre class="text-base block">{{ message }}</pre>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
