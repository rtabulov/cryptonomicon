import { MaybeRef } from './useLocalStorage'
import { computed, unref, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useFilter<T, Filter = string>(
  items: MaybeRef<T[]>,
  filter: MaybeRef<Filter>,
  filterFunc: (item: T, index?: number, array?: T[]) => boolean,
) {
  const filterLocal = ref(filter)
  const filteredItems = computed(() => unref(items).filter(filterFunc))

  return { filteredItems, filter: filterLocal }
}
