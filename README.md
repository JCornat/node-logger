# node-logger

Basic Node.js logger module.  

## How to use

```
import * as Log from 'node-logger-c7z'; //TypeScript way
// var Log = require('node-logger-c7z'); //JavaScript way

Log.info('WAW'); //Output: 2016-12-07T19:33:59.573Z - test\index.js:4 - WAW
Log.debug(['foo', 'bar'], {foo: 'bar'}); //Output: 2016-12-07T19:33:59.589Z - test\index.js:5 - ["foo","bar"], {"foo":"bar"}
Log.error({error: 418, reason: 'because'}); //Output: 2016-12-07T19:33:59.590Z - test\index.js:6 - {"error":418,"reason":"because"}
```

## How does it log ?

It writes log inside a `log` folder, sibling of `node_modules` folder.  
The files are named like `YYYYMMDD.log` and `YYYYMMDD.error.log`.  
