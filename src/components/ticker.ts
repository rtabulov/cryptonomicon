interface Ticker {
  name: string
  price: number
  error?: string
}

interface CryptoData {
  FullName: string
  Id: string
  ImageUrl: string
  Symbol: string
}

type CryptoObject = Record<string, CryptoData>

export { Ticker, CryptoObject, CryptoData }
