const EventEmitter = require('events');

//Register a Listener:
//.on and .addEventListener works the same way

const Logger = require('./logger'); // loading module using the require function - returns the module.exports object
const logger = new Logger(); // We use a CUSTOM class instance, that's extended from EventEmitter class

logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
})

logger.log('message');
// emitter.on('logging', (arg) => {
//   console.log('logging message: ', arg);
// })


// Making a noise, produce - signalling

// // Raise: logging (data: message)
// emitter.emit('logging', "''Wadup up cunt''");

// const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

// fs.readdir('./', function (err, files) {
//   if (err) {
//     console.log('Error >', err)
//   } else {
//     console.log('Result >', files);
//   }
// });

// const os = require('os');
// const path = require('path');
// let totalMemory = os.totalmem();
// let freeMemory = os.freemem();

// console.log('Tota >', totalMemory);
// console.log('Free >', freeMemory);