const API_KEY =
  "95bdf7e8c4ef1827e5f4b13d319b2ac9b409aa62feedc30f0f6553924d6ab246";

let BTCPrice = null;
const tickersHandlers = new Map();

let ws;
const AGGREGATE_INDEX = "5";
const INVALID_SUB_TYPE = "500";
const INVALID_SUB = "INVALID_SUB";

ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

ws.addEventListener("message", e => {
  const message = JSON.parse(e.data);
  const { TYPE: type, MESSAGE: msg, INFO: info } = message;

  if (type === INVALID_SUB_TYPE && msg === INVALID_SUB) {
    const fsym = paramFsym(message.PARAMETER);
    const tsym = paramTsym(message.PARAMETER);
    if (tsym === "USD") {
      const cbs = tickersHandlers.get(fsym) || [];
      tickersHandlers.delete(fsym);
      cbs.forEach(cb =>
        subscribeToTicker(
          fsym,
          ({ name, error, price, message }) => {
            console.log({ BTCPrice, price });
            cb({ name, error, price: BTCPrice * price, message });
          },
          "BTC"
        )
      );
      return;
    }

    const cbs = tickersHandlers.get(fsym);
    if (!cbs) {
      unsubscribeFromTicker(fsym);
      return;
    }

    cbs.forEach(cb => cb({ name: fsym, error: true, message: info }));
  }

  if (type === AGGREGATE_INDEX) {
    const { FROMSYMBOL: fsym, PRICE: price, TOSYMBOL: tsym } = message;
    if (price) {
      const cbs = tickersHandlers.get(fsym) || [];
      cbs.forEach(cb => cb({ name: fsym, price, tsym }));
    }
  }
});

const sendToWs = message => {
  const fn = ws.send.bind(ws, JSON.stringify(message));

  if (ws.readyState === WebSocket.OPEN) {
    fn();
    return;
  }

  ws.addEventListener("open", fn);
};

export const subscribeToTicker = (ticker, cb, tsym = "USD") => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);

  sendToWs({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~${tsym}`]
  });
};

export const unsubscribeFromTicker = (ticker, cb) => {
  if (!cb && ticker !== "BTC") {
    sendToWs({
      action: "SubRemove",
      subs: [`5~CCCAGG~${ticker}~USD`]
    });
    sendToWs({
      action: "SubRemove",
      subs: [`5~CCCAGG~${ticker}~BTC`]
    });

    tickersHandlers.delete(ticker);
    return;
  }

  tickersHandlers.set(
    ticker,
    tickersHandlers.get(ticker).filter(c => c !== cb)
  );
};

const paramFsym = param => param.split("~")[2];
const paramTsym = param => param.split("~")[3];

subscribeToTicker("BTC", ({ price }) => {
  BTCPrice = price;
});
