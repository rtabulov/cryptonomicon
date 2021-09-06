import { Ref, ref, unref, watch } from 'vue'

export type MaybeRef<T> = Ref<T> | T

export default function useLocalStorage<T>(
  key: MaybeRef<string>,
): Ref<T | null> {
  const returnedRef = getFromLocalStorage<T>(key)

  watch(ref(key), () => {
    returnedRef.value = unref(getFromLocalStorage<T>(key))
  })

  watch(
    returnedRef,
    (value) => {
      localStorage.setItem(unref(key), JSON.stringify(value))
    },
    { deep: true },
  )

  return returnedRef
}

function getFromLocalStorage<T>(key: MaybeRef<string>): Ref<T | null> {
  const localStorageValue = localStorage.getItem(unref(key))

  if (localStorageValue) {
    return ref(JSON.parse(localStorageValue))
  }

  return ref(null)
}
