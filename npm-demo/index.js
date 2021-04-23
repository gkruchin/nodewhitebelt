let _ = require('underscore'); // supplying the underscore module - neither a file or folder

// how 'require' looks to understand what you're referencing, in order of checking
// Core module
// File or folder
// node_modules

const result = _.contains([1, 2, 3], 3);
console.log(result);