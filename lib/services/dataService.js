(function () {
  'use strict';

  var serverIds = [];
  var servers = {};
  var serverSockets = {};
  var connections = {};

  module.exports = {
    getAvailableServers: function () {
      return serverIds.map(function (id) {
        return {
          id: id,
          name: servers[id].name,
          ip: servers[id].ip,
          os: servers[id].os
        }
      });
    },
    saveSocket: function (socket) {
      serverSockets[socket.id] = socket;
    },
    getSocket: function (id) {
      return serverSockets[id];
    },
    registerServer: function (id, data) {
      serverIds.push(id);
      servers[id] = data;
    },
    connectSocketTo: function (from, to) {
      connections[from] = to;
    },
    getConnectedSocket: function (id) {
      return connections[id];
    },
    getConnections: function () {
      return connections;
    },
    disconnectSocketFrom: function (from) {
      delete connections[from];
    },
    isServer: function (id) {
      return serverIds.indexOf(id) !== -1;
    },
    removeServer: function (id) {
      serverIds.splice(serverIds.indexOf(id));
      delete servers[id];
      delete serverSockets[socket.id];
    }
  }
})();
