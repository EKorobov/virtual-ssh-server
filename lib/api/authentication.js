(function () {
  'use strict';

  var dataService = require('./../services/dataService');

  module.exports = {
    getAvailableServers: function (socket) {
      return function () {
        socket.emit('get_servers', dataService.getAvailableServers());
      }
    },
    registerServer: function (socket) {
      return function (data) {
        dataService.registerServer(socket.id, data);
        socket.emit('register_server', 'ok');
      }
    },
    disconnect: function (socket) {
      return function () {
        if(dataService.isServer(socket.id)) {
          dataService.removeServer(socket.id);
        }
      }
    }
  };
})();
