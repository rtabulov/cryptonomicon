<template>
  <div class="container">
    <add-ticker
      :get-hints="getHints"
      :check-ticker="tickerExists"
      @add-ticker="add"
    />

    <template v-if="state.tickers.length">
      <hr class="w-full border-t border-gray-400 my-8" />

      <tickers-search @change="onFilterChange" />

      <tickers-pagination
        class="space-x-4 my-4"
        :show-prev="state.page > 1"
        :show-next="hasNextPage"
        @prev="state.page -= 1"
        @next="state.page += 1"
      />

      <hr class="w-full border-t border-gray-400 my-8" />

      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 items-center">
        <tickers-item
          v-for="item in paginatedTickers"
          :key="item.name"
          :ticker="item"
          :selected="state.selectedTicker?.name === item.name"
          :error="Boolean(item.error)"
          @click="select(item)"
          @delete="onDelete"
        />
      </dl>
      <hr class="w-full border-t border-gray-600 my-4" />
    </template>

    <crypto-graph
      v-if="state.selectedTicker"
      :graph="state.graph"
      :heading="`${state.selectedTicker.name} - USD`"
      @close-click="state.selectedTicker = null"
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

import {
  subscribeToTicker,
  unsubscribeFromTicker,
  SubscriberProps,
} from '../api'
import { computed, reactive, watch } from 'vue'
import { Ticker } from '@/components/ticker'
import { useStore } from '@/store/store'

const DEFAULT_COINS = [
  new Ticker('BTC'),
  new Ticker('ETH'),
  new Ticker('DOGE'),
  new Ticker('XPR'),
  new Ticker('ADA'),
  new Ticker('USDT'),
  new Ticker('LINK'),
  new Ticker('UNI'),
  new Ticker('DOT'),
]

const MAX_GRAPH_LENGTH = 80

const store = useStore()

await store.loadCryptoObject()
const { cryptoObject } = store

interface State {
  tickers: Ticker[]
  selectedTicker: Ticker | null
  graph: Array<number>
  filter: string
  page: number
}
const state = reactive<State>({
  tickers: [],
  selectedTicker: null,
  graph: [],
  filter: '',
  page: 1,
})

const filteredTickers = computed(() =>
  state.tickers.filter((t) => t.name.includes(state.filter.toUpperCase())),
)

const startIndex = computed(() => (state.page - 1) * 6)

const endIndex = computed(() => state.page * 6)

const hasNextPage = computed(
  () => filteredTickers.value.length > endIndex.value,
)

const paginatedTickers = computed(() =>
  filteredTickers.value.slice(startIndex.value, endIndex.value),
)

const pageStateOptions = computed(() => ({
  filter: state.filter,
  page: state.page,
}))

watch(
  () => state.graph,
  (value) => {
    if (value.length > MAX_GRAPH_LENGTH) {
      state.graph = value.slice(-MAX_GRAPH_LENGTH)
    }
  },
)
watch(
  () => state.filter,
  () => {
    state.page = 1
  },
)
watch(pageStateOptions, (value) => {
  window.history.pushState(
    null,
    window.document.title,
    `${window.location.pathname}?page=${value.page}&filter=${value.filter}`,
  )
})

watch(
  () => state.selectedTicker,
  () => {
    state.graph = []
  },
)

watch(
  () => state.tickers,
  (value) => {
    localStorage.setItem('cryptonomicon-list', JSON.stringify(value))
  },
)

watch(paginatedTickers, (value) => {
  if (value.length == 0 && state.page > 1) {
    state.page -= 1
  }
})
;(async () => {
  // load tickers from localStorage
  let list =
    window.localStorage.getItem('cryptonomicon-list') ||
    JSON.stringify(DEFAULT_COINS)
  state.tickers = JSON.parse(list).map(
    ({ name, price }: { name: string; price: number }) =>
      new Ticker(name, price),
  )
  state.tickers.forEach((t) => {
    subscribeToTicker(t.name, subscribe)
  })
  if (state.tickers.length > 0) {
    select(state.tickers[0])
  }

  // load filter and page
  let { filter, page } = Object.fromEntries(
    new URLSearchParams(window.location.search).entries(),
  )
  page && (state.page = +page)
  filter && (state.filter = filter)
})()

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

function tickerExists(name: string) {
  return Boolean(getTicker(name))
}

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
  if (state.selectedTicker?.name === name) {
    state.graph = [...state.graph, price]
  }
}

function getTicker(name: string) {
  return state.tickers.find((t) => t.name === name)
}

function tickerIsValid(name: string) {
  return Object.keys(cryptoObject).includes(name)
}

function add(name: string) {
  if (!tickerIsValid(name) || getTicker(name)) {
    return
  }

  const newTicker = new Ticker(name, 0)

  state.tickers = [...state.tickers, newTicker]
  state.filter = ''

  subscribeToTicker(newTicker.name, subscribe)
}

function select(t: Ticker) {
  state.selectedTicker = t
}

function onDelete(tickerToRemove: Ticker) {
  clearInterval(tickerToRemove.intervalID)
  state.tickers = state.tickers.filter((t) => t.name !== tickerToRemove.name)

  // remove selected if it was deleted
  if (tickerToRemove.name === state.selectedTicker?.name) {
    state.selectedTicker = null
  }

  unsubscribeFromTicker(tickerToRemove.name, subscribe)
}

const onFilterChange = (val: string) => (state.filter = val)
</script>
