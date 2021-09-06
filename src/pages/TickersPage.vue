<template>
  <div class="container">
    <ticker-add
      :get-hints="getHints"
      :check-ticker="tickerExists"
      @add-ticker="addTicker"
    />

    <template v-if="tickers.length">
      <hr class="w-full border-t border-gray-400 my-8" />

      <tickers-search @change="onFilterChange" />

      <tickers-pagination
        class="space-x-4 my-4"
        :show-prev="page > 1"
        :show-next="hasNextPage"
        @prev="page -= 1"
        @next="page += 1"
      />

      <hr class="w-full border-t border-gray-400 my-8" />

      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 items-center">
        <tickers-item
          v-for="item in paginatedTickers"
          :key="item.name"
          :ticker="item"
          :selected="selectedTicker?.name === item.name"
          :error="Boolean(item.error)"
          @click="select(item)"
          @delete="removeTicker"
        />
      </dl>
      <hr class="w-full border-t border-gray-600 my-4" />
    </template>

    <crypto-graph
      v-if="selectedTicker"
      :graph="graph"
      :heading="`${selectedTicker.name} - USD`"
      @close-click="selectedTicker = null"
    />
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
// [ ] 7. График ужасно выглядит если будет много цен | Критичность: 2
// [ ] 10. Магические строки и числа (URL, 5000 миллисекунд задержки, ключ локал стораджа, количество на странице) |  Критичность: 1

// Параллельно
// [x] График сломан если везде одинаковые значения
// [x] При удалении тикера остается выбор
import { computed, watch } from 'vue'
import { Ticker } from '@/components/ticker'
import { useStore } from '@/store/store'
import useTickers from '@/composables/useTickers'
import {
  SubscriberProps,
  subscribeToTicker,
  unsubscribeFromTicker,
} from '@/api'
import useGraph from '@/composables/useGraph'

const store = useStore()

await store.loadCryptoObject()
const { cryptoObject } = store

const { graph } = useGraph()

const {
  tickers,
  selectedTicker,
  filter,
  paginatedTickers,
  page,
  hasNextPage,
  tickerExists,
  getTicker,
} = useTickers()

const pageStateOptions = computed(() => ({
  filter: filter.value,
  page: page.value,
}))

watch(pageStateOptions, (value) => {
  window.history.pushState(
    null,
    window.document.title,
    `${window.location.pathname}?page=${value.page}&filter=${value.filter}`,
  )
})

watch(selectedTicker, () => {
  graph.value = []
})

tickers.value.forEach((t) => {
  subscribeToTicker(t.name, subscribe)
})

if (tickers.value.length > 0) {
  select(tickers.value[0])
}

// load filter and page
let { filter: filterParam, page: pageParam } = Object.fromEntries(
  new URLSearchParams(window.location.search).entries(),
)
pageParam && (page.value = +pageParam)
filterParam && (filter.value = filterParam)

function subscribe({ name, price, error, message }: SubscriberProps) {
  const ticker = getTicker(name)
  if (!ticker) {
    return
  }

  if (error) {
    console.log({ error, message })
    ticker.error = message
    return
  }

  ticker.price = price
  if (selectedTicker.value?.name === name) {
    graph.value.push(price)
  }
}

function tickerIsValid(name: string) {
  return Object.keys(cryptoObject).includes(name)
}

function addTicker(name: string) {
  if (!tickerIsValid(name) || getTicker(name)) {
    return
  }

  const newTicker = { name, price: 0 }

  tickers.value = [...tickers.value, newTicker]
  filter.value = ''

  subscribeToTicker(newTicker.name, subscribe)
}

function removeTicker(tickerToRemove: Ticker) {
  tickers.value = tickers.value.filter((t) => t.name !== tickerToRemove.name)

  // remove selected if it was deleted
  if (tickerToRemove.name === selectedTicker.value?.name) {
    selectedTicker.value = null
  }

  unsubscribeFromTicker(tickerToRemove.name, subscribe)
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

function select(t: Ticker) {
  selectedTicker.value = t
}

const onFilterChange = (val: string) => (filter.value = val)
</script>
