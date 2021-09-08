import { watch, unref } from 'vue'
import { MaybeRef } from './useLocalStorage'

interface Stringer {
  toString(): string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useQuery(props: Record<string, MaybeRef<Stringer>>) {
  Object.entries(props).forEach(([key, value]) => {
    watch(
      value,
      (newval) => {
        const search = new URLSearchParams(window.location.search)
        Object.keys(newval)
        search.set(unref(key), newval.toString())

        window.history.pushState(
          null,
          window.document.title,
          `${window.location.pathname}?${search.toString()}`,
        )
      },
      { immediate: true },
    )
  })
}
