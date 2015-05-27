# node-logger
Node write stream logger.

## Usage

```js
var NodeLogger = require('./libs/node-logger');
var logger = new NodeLogger({
    pattern: 'stat', // will write to  stat_yyyyhhddHH.log
    output: isProduction ? false:true // whether using console.log
})

```
