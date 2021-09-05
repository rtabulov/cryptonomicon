<template>
  <app-loader v-if="state.pageStatus === 0" />

  <div class="bg-gray-100">
    <div class="container mx-auto flex flex-col items-center py-4">
      <app-error v-if="state.pageStatus === -1" :message="state.errorMessage" />

      <tickers-page
        v-if="state.pageStatus === 1"
        :crypto-object="state.cryptoObject"
      />
    </div>
  </div>
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
import axios from 'axios'
import { reactive } from 'vue'
import { CryptoObject } from './components/ticker'

interface State {
  errorMessage: string
  pageStatus: number
  cryptoObject: CryptoObject
}
const state = reactive<State>({
  errorMessage: '',
  pageStatus: 0,
  cryptoObject: {},
})

async function bootstrap() {
  try {
    let response = await axios.get(
      'https://min-api.cryptocompare.com/data/all/coinlist?summary=true',
      { timeout: 5000 },
    )
    state.cryptoObject = response.data.Data
    state.pageStatus = 1
  } catch (e) {
    state.pageStatus = -1
    state.errorMessage = String(e)
  }
}

bootstrap()
</script>
