import { Ref } from 'vue'

export default function useDefault<T>(
  someref: Ref<T | null>,
  defaultValue: T,
): Ref<T> {
  if (someref.value === null) {
    someref.value = defaultValue
  }

  return someref as Ref<T>
}
