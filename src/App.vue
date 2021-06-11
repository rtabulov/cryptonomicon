<template>
  <div class="bg-gray-100">
    <div class="container mx-auto flex flex-col items-center p-4">
      <div
        v-if="pageStatus === 0"
        class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
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
        class="fixed w-100 h-100 opacity-80 text-center bg-purple-800 inset-0 z-50 flex flex-col items-center justify-center text-white"
      >
        <h1 class="text-2xl mx-16 mb-4">
          Coin list fetch failed. Try reloading this page.
        </h1>
        <pre class="text-base block">{{ errorMessage }}</pre>
      </div>

      <div v-else class="container">
        <div class="w-full my-4"></div>
        <section>
          <div class="flex">
            <div class="max-w-xs">
              <label
                for="wallet"
                class="block text-sm font-medium text-gray-700"
                >Тикер</label
              >
              <div class="mt-1 relative rounded-md shadow-md">
                <input
                  v-model="ticker"
                  @keydown.enter="add()"
                  type="text"
                  name="wallet"
                  id="wallet"
                  class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  placeholder="Например DOGE"
                />
              </div>
              <div
                class="flex bg-white shadow-md p-1 rounded-md flex-wrap"
                v-if="ticker.length > 0"
              >
                <span
                  v-for="hint in hints"
                  :key="hint"
                  class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
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
          <button
            @click="add()"
            type="button"
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <!-- Heroicon name: solid/mail -->
            <svg
              class="-ml-0.5 mr-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path
                d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              ></path>
            </svg>
            Добавить
          </button>
        </section>

        <template v-if="tickers.length">
          <hr class="w-full border-t border-gray-600 my-4" />
          <div>
            <label>Фильтр</label>
            <input
              v-model="filter"
              type="text"
              class="block mt-1 relative shadow-md w-52 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Поиск: например DOGE"
            />

            <div class="space-x-4 my-4">
              <button
                class="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                @click="page -= 1"
                v-if="page > 1"
              >
                Назад
              </button>
              <button
                class="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                @click="page += 1"
                v-if="hasNextPage"
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
              @click="select(t)"
              class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
              :class="{
                'border-4': selectedTicker?.name === t.name,
                'my-1': selectedTicker?.name !== t.name,
                'bg-red-100': t.error
              }"
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
                @click.stop="handleDelete(t)"
                class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
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
        <section v-if="selectedTicker" class="relative">
          <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
            {{ selectedTicker.name }} - USD
          </h3>
          <div class="flex items-end border-gray-600 border-b border-l h-64">
            <div
              v-for="(bar, idx) in normalizedGraph"
              :key="idx"
              :style="{ height: `${bar}%` }"
              class="bg-purple-800 border w-10"
            ></div>
          </div>
          <button
            @click="selectedTicker = null"
            type="button"
            class="absolute top-0 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              version="1.1"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 511.76 511.76"
              style="enable-background:new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                  fill="#718096"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </section>
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
import axios from "axios";
import { subscribeToTicker, unsubscribeFromTicker } from "./api";

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

export default {
  name: "App",

  async created() {
    // load cryptoObject data
    try {
      let response = await axios.get(
        "https://min-api.cryptocompare.com/data/all/coinlist?summary=true",
        {
          timeout: 5000
        }
      );
      this.cryptoObject = response.data.Data;
      this.pageStatus = 1;
    } catch (e) {
      this.errorMessage = String(e.toString());
      this.pageStatus = -1;
    }

    // load tickers from localStorage
    let list = window.localStorage.getItem("cryptonomicon-list");
    this.tickers = JSON.parse(list) || [];
    this.tickers.forEach(t => {
      subscribeToTicker(t.name, this.subscribe);
    });

    // load filter and page
    let { filter, page } = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
    page && (this.page = +page);
    filter && (this.filter = filter);
  },

  data() {
    return {
      ticker: "",
      tickers: [],
      selectedTicker: null,
      graph: [],
      cryptoObject: {},
      filter: "",
      page: 1,
      errorMessage: null,
      pageStatus: 0
    };
  },

  computed: {
    hasNextPage() {
      return this.filteredTickers.length > this.endIndex;
    },

    filteredTickers() {
      return this.tickers.filter(t =>
        t.name.includes(this.filter.toUpperCase())
      );
    },

    startIndex() {
      let start = (this.page - 1) * 6;
      return start;
    },

    endIndex() {
      return this.page * 6;
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
    },

    hints() {
      if (this.ticker.length === 0) return [];

      return Object.keys(this.cryptoObject)
        .filter(
          coin =>
            coin.includes(this.ticker) ||
            this.cryptoObject[coin].FullName.toUpperCase().includes(this.ticker)
        )
        .slice(0, 4);
    },

    tickerExists() {
      return !!this.getTicker(this.ticker);
    },

    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      if (minValue === maxValue) return new Array(this.graph.length).fill(50);
      return this.graph.map(
        price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },

    tickerIsValid() {
      return Object.keys(this.cryptoObject).includes(this.ticker);
    },

    pageStateOptions() {
      return { filter: this.filter, page: this.page };
    }
  },

  watch: {
    filter() {
      this.page = 1;
    },

    pageStateOptions(value) {
      window.history.pushState(
        null,
        window.document.title,
        `${window.location.pathname}?page=${value.page}&filter=${value.filter}`
      );
    },

    selectedTicker() {
      this.graph = [];
    },

    tickers(value) {
      // sync to localstorage
      localStorage.setItem("cryptonomicon-list", JSON.stringify(value));
    },

    paginatedTickers(newtickers) {
      if (newtickers.length == 0 && this.page > 1) {
        this.page -= 1;
      }
    },

    ticker(newticker) {
      this.ticker = newticker.toUpperCase();
    }
  },

  methods: {
    subscribe({ name, price, error, message }) {
      console.log({ name, price, error, message });
      if (error) {
        console.log({ error, message });
        this.getTicker(name).error = message;
        this.tickers = this.tickers.slice();
        return;
      }

      this.getTicker(name).price = price;
      this.tickers = this.tickers.slice();
      if (this.selectedTicker?.name === name) {
        this.graph.push(price);
      }
    },

    getTicker(name) {
      return this.tickers.find(t => t.name === name);
    },

    formatPrice(price = 0) {
      if (typeof price !== "number") {
        return price;
      }

      price = Number(price);

      if (price < 1) {
        return price.toPrecision(3);
      }

      return price.toFixed(2);
    },

    hintClick(hint) {
      this.ticker = hint;
      this.add();
    },

    add() {
      if (this.tickerExists || !this.tickerIsValid) {
        return;
      }
      const newTicker = {
        name: this.ticker,
        price: "-"
      };

      this.tickers = [...this.tickers, newTicker];
      this.ticker = "";
      this.filter = "";

      subscribeToTicker(newTicker.name, this.subscribe);
    },

    select(t) {
      this.selectedTicker = t;
    },

    handleDelete(tickerToRemove) {
      clearInterval(tickerToRemove.intervalID);
      this.tickers = this.tickers.filter(t => t.name !== tickerToRemove.name);

      // remove selected if it was deleted
      if (tickerToRemove.name === this.selectedTicker?.name) {
        this.selectedTicker = null;
      }

      unsubscribeFromTicker(tickerToRemove.name, this.subscribe);
    }
  }
};
</script>
