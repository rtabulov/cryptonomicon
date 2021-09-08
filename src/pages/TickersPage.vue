<template>
  <div class="container px-3">
    <ticker-add :check-ticker="tickerExists" @add-ticker="addTicker" />

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

    <app-graph
      v-if="selectedTicker"
      :graph="graph"
      :heading="`${selectedTicker.name} - USD`"
      @close-click="selectedTicker = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { watch, Ref, ref } from 'vue'
import { Ticker } from '@/components/ticker'
import { useStore } from '@/store/store'
import useTickers from '@/composables/useTickers'
import {
  SubscriberProps,
  subscribeToTicker,
  unsubscribeFromTicker,
} from '@/api'
import useQuery from '@/composables/useSearchParams'

const store = useStore()

await store.loadCryptoObject()
const { cryptoObject } = store

const graph: Ref<number[]> = ref([])

const {
  tickers,
  filter,
  paginatedTickers,
  page,
  hasNextPage,
  tickerExists,
  getTicker,
} = useTickers()

const selectedTicker: Ref<Ticker | null> = ref(null)

useQuery({ filter, page })

// TODO refactor!
// load filter and page from search params
let { filter: filterParam, page: pageParam } = Object.fromEntries(
  new URLSearchParams(window.location.search).entries(),
)
pageParam && (page.value = +pageParam)
filterParam && (filter.value = filterParam)

// reset graph on selected ticker change
watch(selectedTicker, () => {
  graph.value = []
})

// TODO refactor!
tickers.value.forEach((t) => {
  subscribeToTicker(t.name, subscribe)
})

// TODO refactor!
if (tickers.value.length > 0) {
  select(tickers.value[0])
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

function select(t: Ticker) {
  selectedTicker.value = t
}

function onFilterChange(val: string) {
  return (filter.value = val)
}
</script>
