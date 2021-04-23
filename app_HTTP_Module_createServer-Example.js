const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
}); // creating a web server
// this server is an EventEmitter
  // has all capabitiles like from EventEmitter like .on, .emit, so on

// everytime there's a new connectin ore request, this server raises an event
// before listening, you wanna regiester a listener (or a "handler)")

server.on('connection', (socket) => {
  console.log('New connection...');
})

server.listen(3000);

console.log(`Listening on port 3000...`);