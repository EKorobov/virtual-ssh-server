(function () {
  'use strict';

  var dataService = require('./../services/dataService');

  module.exports = {
    connectTo: function (socket) {
      return function (data) {
        let serverSocket = dataService.getSocket(data.id);

        if (serverSocket) {
          serverSocket.emit('connection_request', {
            from: socket.id,
            passphrase: data.passphrase
          });
        }
      }
    },
    proveConnection: function (socket) {
      return function (from) {
        dataService.connectSocketTo(from, socket.id);

        dataService.getSocket(from).emit(
          'prove_connection',
          'Connection Established'
        );
      }
    },
    disconnectFrom: function (socket) {
      return function (id) {
        if(dataService.isServer(id)) {
          dataService.disconnectSocketFrom(id);
        }
      }
    }
  };
})();
