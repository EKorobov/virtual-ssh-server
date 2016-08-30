(function () {
  'use strict';

  // lodash
  var _ = require('lodash');

  // services
  var dataService = require('./../services/dataService');

  module.exports = {
    commandRequest: function (socket) {
      return function (command) {
        let receiver = dataService.getSocket(
          dataService.getConnectedSocket(socket.id)
        );

        if (receiver) {
          receiver.emit('command_req', command);
        } else {
          socket.emit(
            'error',
            'Error processing command request: connected socket not found'
          );
        }
      }
    },
    commandResponse: function (socket) {
      return function (commandResult) {
        let receiver = dataService.getSocket(
          _.findKey(dataService.getConnections(), value => {
            return value == socket.id
          })
        );

        if (receiver) {
          receiver.emit('command_resp', commandResult);
        }
      }
    }
  };
})();
