import { MaybeRef } from './useLocalStorage'
import { ref, watch, computed, unref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function usePagination<T>(
  list: MaybeRef<T[]>,
  perPage: MaybeRef<number>,
  indexOffset = 0,
  startPage = 0,
) {
  const page = ref(startPage + indexOffset)

  const startIndex = computed(() => (page.value - 1) * unref(perPage))

  const endIndex = computed(() => page.value * unref(perPage))

  const hasNextPage = computed(() => unref(list).length > endIndex.value)
  const isLastPage = computed(() => !hasNextPage.value)
  const isFirstPage = computed(() => page.value !== indexOffset)

  const paginatedItems = computed(() =>
    unref(list).slice(startIndex.value, endIndex.value),
  )

  watch(paginatedItems, (value) => {
    if (value.length == 0 && page.value > indexOffset) {
      page.value -= 1
    }
  })

  return {
    paginatedItems,
    page,
    startIndex,
    endIndex,
    isLastPage,
    isFirstPage,
    hasNextPage,
  }
}
