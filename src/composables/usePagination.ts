import { MaybeRef } from './useLocalStorage'
import { ref, watch, computed, unref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function usePagination<T>(
  list: MaybeRef<T[]>,
  perPage: MaybeRef<number>,
  indexOffset = 0,
) {
  const page = ref(indexOffset)

  const startIndex = computed(() => (page.value - indexOffset) * unref(perPage))
  const endIndex = computed(() => startIndex.value + unref(perPage))

  const hasNextPage = computed(() => unref(list).length > endIndex.value)
  const isLastPage = computed(() => !hasNextPage.value)
  const isFirstPage = computed(() => page.value !== indexOffset)
  const numberOfPages = computed(() =>
    Math.ceil(unref(list).length / unref(perPage)),
  )
  const lastPageNumber = computed(() => numberOfPages.value - 1)

  const paginatedItems = computed(() =>
    unref(list).slice(startIndex.value, endIndex.value),
  )

  watch(paginatedItems, (value) => {
    if (value.length == 0 && page.value > indexOffset) {
      page.value = lastPageNumber.value
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
