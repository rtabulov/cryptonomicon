import { Ref, ref, unref, watch } from 'vue'

export type MaybeRef<T> = Ref<T> | T

export default function useLocalStorage<T>(
  data: Ref<T>,
  key: MaybeRef<string>,
): Ref<T> {
  const lsValue = getFromLocalStorage<T>(key)
  if (lsValue) {
    data.value = lsValue
  }

  watch(ref(key), () => {
    const lsValue = getFromLocalStorage<T>(key)
    if (lsValue) {
      data.value = lsValue
    }
  })

  watch(
    data,
    (value) => {
      localStorage.setItem(unref(key), JSON.stringify(value))
    },
    { deep: true },
  )

  return data
}

function getFromLocalStorage<T>(key: MaybeRef<string>): T | null {
  const localStorageValue = localStorage.getItem(unref(key))

  if (localStorageValue) {
    return JSON.parse(localStorageValue)
  }

  return null
}
