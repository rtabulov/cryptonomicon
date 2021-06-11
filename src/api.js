const API_KEY =
  "95bdf7e8c4ef1827e5f4b13d319b2ac9b409aa62feedc30f0f6553924d6ab246";

let BTCPrice = null;
const tickersHandlers = new Map();

const ws = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);
const AGGREGATE_INDEX_TYPE = "5";
const INVALID_SUB_TYPE = "500";
const STREAMER_WELCOME_TYPE = "20";
const TOO_MANY_SOCKETS_TYPE = "429";
const INVALID_SUB = "INVALID_SUB";

const SHARED_TYPES = {
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
  UPDATE: "update"
};

const sw = new SharedWorker("/worker.js");
sw.port.start();

ws.addEventListener("message", e => {
  const message = JSON.parse(e.data);
  if (message.TYPE === STREAMER_WELCOME_TYPE) {
    sw.port.addEventListener("message", ({ data: { type, fsym, tsym } }) => {
      if (type === SHARED_TYPES.SUBSCRIBE) {
        sendToWs({
          action: "SubAdd",
          subs: [`5~CCCAGG~${fsym}~${tsym}`]
        });
        return;
      }

      if (type === SHARED_TYPES.UNSUBSCRIBE) {
        sendToWs({
          action: "SubRemove",
          subs: [`5~CCCAGG~${fsym}~${tsym}`]
        });
      }
    });
    return;
  }

  if (message.TYPE === TOO_MANY_SOCKETS_TYPE) {
    sw.port.addEventListener("message", ({ data: { data, type } }) => {
      if (type === SHARED_TYPES.UPDATE) {
        const { fsym, price, tsym } = data;
        const cbs = tickersHandlers.get(fsym) || [];
        cbs.forEach(cb => cb({ name: fsym, price, tsym }));
      }
    });
  }
});

// cross currency
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
    return;
  }

  if (type === AGGREGATE_INDEX_TYPE) {
    const { FROMSYMBOL: fsym, PRICE: price, TOSYMBOL: tsym } = message;
    if (price) {
      sw.port.postMessage({ type: "update", data: { fsym, price, tsym } });

      const cbs = tickersHandlers.get(fsym) || [];
      cbs.forEach(cb => cb({ name: fsym, price, tsym }));
    }
  }
});

subscribeToTicker("BTC", ({ price }) => {
  BTCPrice = price;
});

export function subscribeToTicker(ticker, cb, tsym = "USD") {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);

  sendToWs({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~${tsym}`]
  });

  sw.port.postMessage({ type: "subscribe", fsym: ticker, tsym });
}

export function unsubscribeFromTicker(ticker, cb) {
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

    sw.port.postMessage({ type: "unsubscribe", fsym: ticker, tsym: "USD" });
    sw.port.postMessage({ type: "unsubscribe", fsym: ticker, tsym: "BTC" });

    return;
  }

  tickersHandlers.set(
    ticker,
    tickersHandlers.get(ticker).filter(c => c !== cb)
  );
}

function paramFsym(param) {
  return param.split("~")[2];
}
function paramTsym(param) {
  return param.split("~")[3];
}
function sendToWs(message) {
  const fn = ws.send.bind(ws, JSON.stringify(message));

  if (ws.readyState === WebSocket.OPEN) {
    fn();
    return;
  }

  ws.addEventListener("open", fn);
}
