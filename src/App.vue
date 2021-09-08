<template>
  <div v-if="error">
    <div class="bg-gray-100">
      <div class="container px-3 mx-auto flex flex-col items-center py-4">
        <app-error :message="error.toString()" />
      </div>
    </div>
  </div>

  <suspense>
    <template #default>
      <div class="bg-gray-100">
        <div class="container px-3 mx-auto flex flex-col items-center py-4">
          <tickers-page />
        </div>
      </div>
    </template>
    <template #fallback>
      <app-loader />
    </template>
  </suspense>
</template>

<script lang="ts" setup>
// [x] 6. Наличие в состоянии ЗАВИСИМЫХ ДАННЫХ | Критичность: 5+
// [ ] 4. Запросы напрямую внутри компонента (???) | Критичность: 5
// [x] 2. При удалении остается подписка на загрузку тикера | Критичность: 5
// [x] 5. Обработка ошибок API | Критичность: 5
// [x] 3. Количество запросов | Критичность: 4
// [x] 8. При удалении тикера не изменяется localStorage | Критичность: 4
// [x] 1. Одинаковый код в watch | Критичность: 3
// [ ] 9. localStorage и анонимные вкладки | Критичность: 3
// [x] 7. График ужасно выглядит если будет много цен | Критичность: 2
// [ ] 10. Магические строки и числа (URL, 5000 миллисекунд задержки, ключ локал стораджа, количество на странице) |  Критичность: 1

// Параллельно
// [x] График сломан если везде одинаковые значения
// [x] При удалении тикера остается выбор

import TickersPage from './pages/TickersPage.vue'

import { onErrorCaptured, Ref, ref } from 'vue'

const error: Ref<Error | null> = ref(null)
onErrorCaptured((e) => {
  error.value = e
  return true
})
</script>
