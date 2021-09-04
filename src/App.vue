<template>
  <div class="bg-gray-100">
    <div class="container mx-auto flex flex-col items-center p-4">
      <div
        v-if="pageStatus === 0"
        class="
          fixed
          w-100
          h-100
          opacity-80
          bg-purple-800
          inset-0
          z-50
          flex
          items-center
          justify-center
        "
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>

      <div
        v-else-if="pageStatus === -1"
        class="
          fixed
          w-100
          h-100
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
        <pre class="text-base block">{{ errorMessage }}</pre>
      </div>

      <div v-else class="container">
        <add-ticker
          :get-hints="getHints"
          :check-ticker="tickerExists"
          @add-ticker="add"
        />

        <template v-if="tickers.length">
          <hr class="w-full border-t border-gray-600 my-4" />
          <div>
            <label>Поиск</label>
            <input
              v-model="filter"
              type="text"
              class="
                block
                mt-2
                relative
                shadow-md
                w-52
                pr-10
                p-2
                border-gray-300
                text-gray-900
                focus:outline-none focus:ring-gray-500 focus:border-gray-500
                sm:text-sm
                rounded-md
              "
              placeholder="например DOGE"
            />

            <div class="space-x-4 my-4">
              <button
                v-if="page > 1"
                class="
                  inline-flex
                  items-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  leading-4
                  font-medium
                  rounded-full
                  text-white
                  bg-gray-600
                  hover:bg-gray-700
                  transition-colors
                  duration-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-gray-500
                "
                @click="page -= 1"
              >
                Назад
              </button>
              <button
                v-if="hasNextPage"
                class="
                  inline-flex
                  items-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  leading-4
                  font-medium
                  rounded-full
                  text-white
                  bg-gray-600
                  hover:bg-gray-700
                  transition-colors
                  duration-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-gray-500
                "
                @click="page += 1"
              >
                Вперед
              </button>
            </div>
          </div>
          <hr class="w-full border-t border-gray-600 my-4" />
          <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 items-center">
            <div
              v-for="t in paginatedTickers"
              :key="t.name"
              class="
                bg-white
                overflow-hidden
                shadow
                rounded-lg
                border-purple-800 border-solid
                cursor-pointer
              "
              :class="{
                'border-4': selectedTicker?.name === t.name,
                'my-1': selectedTicker?.name !== t.name,
                'bg-red-100': t.error,
              }"
              @click="select(t)"
            >
              <div class="px-4 py-5 sm:p-6 text-center">
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ t.name }} - USD
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">
                  {{ formatPrice(t.price) }}
                </dd>
              </div>
              <div class="w-full border-t border-gray-200"></div>
              <button
                class="
                  flex
                  items-center
                  justify-center
                  font-medium
                  w-full
                  bg-gray-100
                  px-4
                  py-4
                  sm:px-6
                  text-md text-gray-500
                  hover:text-gray-600 hover:bg-gray-200 hover:opacity-20
                  transition-all
                  focus:outline-none
                "
                @click.stop="handleDelete(t)"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#718096"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path></svg
                >Удалить
              </button>
            </div>
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
    </div>
  </div>
</template>

<script>
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

import { subscribeToTicker, unsubscribeFromTicker } from './api'
import axios from 'axios'
import AddTicker from './components/AddTicker.vue'
import CryptoGraph from './components/CryptoGraph.vue'

// const DEFAULT_COINS = [
//   { name: "BTC" },
//   { name: "ETH" },
//   { name: "DOGE" },
//   { name: "XPR" },
//   { name: "ADA" },
//   { name: "USDT" },
//   { name: "LINK" },
//   { name: "UNI" },
//   { name: "DOT" }
// ];

const MAX_GRAPH_LENGTH = 80

export default {
  name: 'App',

  components: {
    AddTicker,
    CryptoGraph,
  },

  data() {
    return {
      tickers: [],
      selectedTicker: null,
      graph: [],
      filter: '',
      page: 1,
      errorMessage: null,
      pageStatus: 1,
      cryptoObject: {},
    }
  },

  computed: {
    hasNextPage() {
      return this.filteredTickers.length > this.endIndex
    },

    filteredTickers() {
      return this.tickers.filter((t) =>
        t.name.includes(this.filter.toUpperCase()),
      )
    },

    startIndex() {
      let start = (this.page - 1) * 6
      return start
    },

    endIndex() {
      return this.page * 6
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex)
    },

    pageStateOptions() {
      return { filter: this.filter, page: this.page }
    },
  },

  watch: {
    graph(v) {
      if (v.length > MAX_GRAPH_LENGTH) {
        this.graph = v.slice(-MAX_GRAPH_LENGTH)
      }
    },
    filter() {
      this.page = 1
    },

    pageStateOptions(value) {
      window.history.pushState(
        null,
        window.document.title,
        `${window.location.pathname}?page=${value.page}&filter=${value.filter}`,
      )
    },

    selectedTicker() {
      this.graph = []
    },

    tickers(value) {
      // sync to localstorage
      localStorage.setItem('cryptonomicon-list', JSON.stringify(value))
    },

    paginatedTickers(newtickers) {
      if (newtickers.length == 0 && this.page > 1) {
        this.page -= 1
      }
    },
  },

  async created() {
    // load coin list
    try {
      let response = await axios.get(
        'https://min-api.cryptocompare.com/data/all/coinlist?summary=true',
        {
          timeout: 5000,
        },
      )
      this.cryptoObject = response.data.Data

      this.pageStatus = 1
    } catch (e) {
      this.pageStatus = -1
      this.errorMessage = e.toString()
    }

    // load tickers from localStorage
    let list = window.localStorage.getItem('cryptonomicon-list')
    this.tickers = JSON.parse(list) || []
    this.tickers.forEach((t) => {
      subscribeToTicker(t.name, this.subscribe)
    })
    if (this.tickers.length > 0) {
      this.select(this.tickers[0])
    }

    // load filter and page
    let { filter, page } = Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    )
    page && (this.page = +page)
    filter && (this.filter = filter)
  },
  methods: {
    getHints(ticker) {
      const res = Object.keys(this.cryptoObject)
        .filter(
          (coin) =>
            coin.includes(ticker) ||
            this.cryptoObject[coin].FullName.toUpperCase().includes(ticker),
        )
        .slice(0, 4)
      return res
    },
    tickerExists(name) {
      return !!this.getTicker(name)
    },

    subscribe({ name, price, error, message }) {
      if (error) {
        console.log({ error, message })
        this.getTicker(name).error = message
        this.tickers = this.tickers.slice()
        return
      }

      this.getTicker(name).price = price
      this.tickers = this.tickers.slice()
      if (this.selectedTicker?.name === name) {
        this.graph = [...this.graph, price]
      }
    },

    getTicker(name) {
      return this.tickers.find((t) => t.name === name)
    },

    formatPrice(price = 0) {
      if (typeof price !== 'number') {
        return price
      }

      price = Number(price)

      if (price < 1) {
        return price.toPrecision(3)
      }

      return price.toFixed(2)
    },
    tickerIsValid(ticker) {
      return Object.keys(this.cryptoObject).includes(ticker)
    },

    add(ticker) {
      if (!this.tickerIsValid(ticker)) {
        return
      }

      const newTicker = {
        name: ticker,
        price: '-',
      }

      this.tickers = [...this.tickers, newTicker]
      this.filter = ''

      subscribeToTicker(newTicker.name, this.subscribe)
    },

    select(t) {
      this.selectedTicker = t
    },

    handleDelete(tickerToRemove) {
      clearInterval(tickerToRemove.intervalID)
      this.tickers = this.tickers.filter((t) => t.name !== tickerToRemove.name)

      // remove selected if it was deleted
      if (tickerToRemove.name === this.selectedTicker?.name) {
        this.selectedTicker = null
      }

      unsubscribeFromTicker(tickerToRemove.name, this.subscribe)
    },
  },
}
</script>
