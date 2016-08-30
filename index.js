(function () {
  'use strict';

  // general imports
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  // api imports
  var authApi = require('./lib/api/authentication');
  var commandsApi = require('./lib/api/commands');
  var connectionsApi = require('./lib/api/connections');

  // services imports
  var dataService = require('./lib/services/dataService');

  // configs imports
  var config = require('./configs/config.json');

  io.on('connection', function(socket){
    console.log('a user connected');
    // save new socket
    dataService.saveSocket(socket);

    /* AUTHENTICATION REGION */
    socket.on('register_server', authApi.registerServer(socket));
    socket.on('get_servers', authApi.getAvailableServers(socket));
    socket.on('disconnect', authApi.disconnect(socket));

    /* CLIENT-SERVER CONNECTIONS REGION */
    socket.on('connect_to', connectionsApi.connectTo(socket));
    socket.on('prove_connection', connectionsApi.proveConnection(socket));
    socket.on('disconnect_from', connectionsApi.disconnectFrom(socket));

    /* COMMAND REGIONS */
    socket.on('command_req', commandsApi.commandRequest(socket));
    socket.on('command_resp', commandsApi.commandResponse(socket));

  });

  http.listen(config['SERVER_PORT'], config['SERVER_HOST'], function(){
    console.log(
      `*listening on ${config['SERVER_HOST']}:${config['SERVER_PORT']}*`
    );
  });
})();
