const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4000

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)
var contador = 0;
// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')
  socket.emit('interval', {ancho:(contador*1),alto: (contador*1)});

setInterval(function(){
  socket.emit('news_by_server', 'Cow goes moo'); 
}, 6000);


setInterval(function(){
  console.log(contador)
  socket.emit('interval', {ancho:'1',alto: '1'});
  contador = contador + 1;

}, 1000);

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', (color) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above

  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}) 

server.listen(port, () => console.log(`Listening on port ${port}`))
