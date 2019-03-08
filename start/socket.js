'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

var uuid = require('uuid');
const Ws = use('Ws')

let connections = {};

Ws.channel('read-analytics', ({ socket, auth }) => {
  let pushInterval = setInterval(() => {
    try  {
      socket.emit('analytics', {connections});
    } catch (err) {}
  }, 500);
  setTimeout(() => {
    clearTimeout(pushInterval);
  }, 1000);

  subscribe('write-analytics:update', () => {
    try {
      socket.emit('analytics', {connections});
    } catch (err) {}
  })
}).middleware(['auth']);

Ws.channel('write-analytics', ({ socket }) => {
  connections[socket.id] = {route: ""};
  publish('write-analytics:update');

  socket.on('routeChange', (d) => {
    connections[socket.id]['route'] = d;

    publish('write-analytics:update');
  });

  socket.on('close', () => {
    delete connections[socket.id];
    publish('write-analytics:update');
  });
});


const subscriptions = { }
function subscribe(eventType, callback) {
  let id = uuid.v1();

  // create new entry for eventType
  if(!subscriptions[eventType])
    subscriptions[eventType] = { }
  // the callback is registered
  subscriptions[eventType][id] = callback
  return {
    unsubscribe: () => {
      delete subscriptions[eventType][id]
      if(Object.keys(subscriptions[eventType]).length === 0)
        delete subscriptions[eventType]
    }
  }
}

function publish(eventType, arg) {
  if(!subscriptions[eventType])
    return
  Object.keys(subscriptions[eventType])
      .forEach(id => subscriptions[eventType][id](arg))
}
