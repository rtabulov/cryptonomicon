import { watch, ref } from 'vue'
import useLocalStorage from './useLocalStorage'
import useFilter from './useFilter'
import usePagination from './usePagination'
import { Ticker } from '@/components/ticker'

const DEFAULT_COINS: Ticker[] = [
  { name: 'BTC', price: 0 },
  { name: 'ETH', price: 0 },
  { name: 'DOGE', price: 0 },
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useTickers() {
  const tickers = ref(DEFAULT_COINS)

  useLocalStorage(tickers, 'cryptonomicon-list')

  const filterFunc = (t: Ticker): boolean =>
    t.name.includes(filter.value.toUpperCase())

  const { filter, filteredItems: filteredTickers } = useFilter<Ticker>(
    tickers,
    '',
    filterFunc,
  )

  const {
    page,
    paginatedItems: paginatedTickers,
    hasNextPage,
  } = usePagination(filteredTickers, 6, 1)

  watch(filter, () => {
    page.value = 1
  })

  function getTicker(name: string) {
    return tickers.value.find((t) => t.name === name)
  }

  function tickerExists(name: string) {
    return Boolean(getTicker(name))
  }

  return {
    tickers,
    filteredTickers,
    filter,
    page,
    hasNextPage,
    tickerExists,
    paginatedTickers,
    getTicker,
  }
}
