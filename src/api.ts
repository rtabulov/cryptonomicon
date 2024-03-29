const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY

let BTCPrice: number

export interface SubscriberProps {
  price: number
  name: string
  tsym: string
  error: boolean
  message: string
}
export type Subscriber = (props: SubscriberProps) => void
const tickersHandlers = new Map<string, Subscriber[]>()

const ws = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`,
)
const AGGREGATE_INDEX_TYPE = '5'
const INVALID_SUB_TYPE = '500'
// const STREAMER_WELCOME_TYPE = '20'
// const TOO_MANY_SOCKETS_TYPE = '429'
const INVALID_SUB = 'INVALID_SUB'

// const SHARED_TYPES = {
//   SUBSCRIBE: 'subscribe',
//   UNSUBSCRIBE: 'unsubscribe',
//   UPDATE: 'update',
// }

// const sw = new SharedWorker('/worker.js')
// sw.port.start()

// ws.addEventListener('message', (e) => {
// const message = JSON.parse(e.data)
// if (message.TYPE === STREAMER_WELCOME_TYPE) {
//   sw.port.addEventListener('message', ({ data: { type, fsym, tsym } }) => {
//     if (type === SHARED_TYPES.SUBSCRIBE) {
//       sendToWs({
//         action: 'SubAdd',
//         subs: [`5~CCCAGG~${fsym}~${tsym}`],
//       })
//       return
//     }
//     if (type === SHARED_TYPES.UNSUBSCRIBE) {
//       sendToWs({
//         action: 'SubRemove',
//         subs: [`5~CCCAGG~${fsym}~${tsym}`],
//       })
//     }
//   })
//   return
// }
// if (message.TYPE === TOO_MANY_SOCKETS_TYPE) {
//   sw.port.addEventListener('message', ({ data: { data, type } }) => {
//     if (type === SHARED_TYPES.UPDATE) {
//       const { fsym, price, tsym } = data
//       const cbs = tickersHandlers.get(fsym) || []
//       cbs.forEach((cb) =>
//         cb({ name: fsym, price, tsym, error: false, message }),
//       )
//     }
//   })
// }
// })

// cross currency
ws.addEventListener('message', (e) => {
  const message = JSON.parse(e.data)
  const { TYPE: type, MESSAGE: msg, INFO: info } = message

  if (type === INVALID_SUB_TYPE && msg === INVALID_SUB) {
    const fsym = paramFsym(message.PARAMETER)
    const tsym = paramTsym(message.PARAMETER)
    if (tsym === 'USD') {
      const cbs = tickersHandlers.get(fsym) || []
      tickersHandlers.delete(fsym)
      cbs.forEach((cb) =>
        subscribeToTicker(
          fsym,
          ({ name, error, price, message }) => {
            cb({ name, error, price: BTCPrice * price, message, tsym })
          },
          'BTC',
        ),
      )
      return
    }

    const cbs = tickersHandlers.get(fsym)
    if (!cbs) {
      unsubscribeFromTicker(fsym)
      return
    }

    cbs.forEach((cb) =>
      cb({ name: fsym, error: true, message: info, tsym, price: NaN }),
    )
    return
  }

  if (type === AGGREGATE_INDEX_TYPE) {
    const { FROMSYMBOL: fsym, PRICE: price, TOSYMBOL: tsym } = message
    if (price) {
      // sw.port.postMessage({ type: 'update', data: { fsym, price, tsym } })

      const cbs = tickersHandlers.get(fsym) || []
      cbs.forEach((cb) =>
        cb({ name: fsym, price, tsym, error: false, message }),
      )
    }
  }
})

subscribeToTicker('BTC', ({ price }) => (BTCPrice = price))

export function subscribeToTicker(
  ticker: string,
  cb: Subscriber,
  tsym = 'USD',
): void {
  const subscribers = tickersHandlers.get(ticker) || []
  tickersHandlers.set(ticker, [...subscribers, cb])

  sendToWs({
    action: 'SubAdd',
    subs: [`5~CCCAGG~${ticker}~${tsym}`],
  })

  // sw.port.postMessage({ type: 'subscribe', fsym: ticker, tsym })
}

export function unsubscribeFromTicker(ticker: string, cb?: Subscriber): void {
  if (!cb && ticker !== 'BTC') {
    sendToWs({
      action: 'SubRemove',
      subs: [`5~CCCAGG~${ticker}~USD`],
    })
    sendToWs({
      action: 'SubRemove',
      subs: [`5~CCCAGG~${ticker}~BTC`],
    })

    tickersHandlers.delete(ticker)

    // sw.port.postMessage({ type: 'unsubscribe', fsym: ticker, tsym: 'USD' })
    // sw.port.postMessage({ type: 'unsubscribe', fsym: ticker, tsym: 'BTC' })

    return
  }

  const existing = tickersHandlers.get(ticker) || []
  tickersHandlers.set(
    ticker,
    existing.filter((c) => c !== cb),
  )
}

function paramFsym(param: string) {
  return param.split('~')[2]
}
function paramTsym(param: string) {
  return param.split('~')[3]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sendToWs(message: any) {
  const fn = ws.send.bind(ws, JSON.stringify(message))

  if (ws.readyState === WebSocket.OPEN) {
    fn()
    return
  }

  ws.addEventListener('open', fn)
}
