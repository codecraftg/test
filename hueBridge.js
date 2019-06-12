const huejay = require('huejay');
const hue = require('hue-module');

const bridgeIp = [];
huejay
  .discover()
  .then(bridges => {
    for (const bridge of bridges) {
      console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
      bridgeIp.push({ id: bridge.id, ip: bridge.ip });
    }
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`);
  });

if (bridgeIp.length > 0) {
  const hueHost = bridgeIp[0].ip;
  const loadBridge = function(host) {
    hue.load({
      host
    });
    hue.getUsername(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Hue bridge UserName: ${result.username}`);
    });
  };
  loadBridge(hueHost);
}
