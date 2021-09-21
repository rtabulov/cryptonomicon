export function formatPrice(price: number | null | undefined): string {
  if (!price) {
    return '-'
  }

  if (price < 1) {
    return price.toPrecision(4)
  }
  return price.toFixed(2)
}
