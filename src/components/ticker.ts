export class Ticker {
  name: string
  price: number
  intervalID?: number
  error?: string

  constructor(name: string, price = 0) {
    this.name = name
    this.price = price
  }

  formatPrice(): string {
    if (this.price === 0) {
      return '-'
    }

    if (this.price < 1) {
      return this.price.toPrecision(3)
    }
    return this.price.toFixed(2)
  }
}

export interface CryptoData {
  FullName: string
  Id: string
  ImageUrl: string
  Symbol: string
}

export type CryptoObject = Record<string, CryptoData>
