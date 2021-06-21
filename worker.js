let ports = [];

onconnect = function(e) {
  const port = e.ports[0];
  ports.push(port);

  port.onmessage = function(e) {
    ports.filter(p => p !== port).forEach(port => port.postMessage(e.data));
  };
};
