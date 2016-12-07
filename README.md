#node-logger

Basic Node.js logger module.  
Writes inside `../../log` folder.

##How to use

```
import * as Log from "node-logger-c7z"; //TypeScript way
// var Log = require('node-logger-c7z'); //JavaScript way

Log.write('WAW');
Log.writeError(error, myArray, randomObject);
```

##How does it log ?

It writes log inside a `log` folder, sibling of `node_modules` folder.  
The files are named like `YYYYMMDD.log` and `YYYYMMDD.error.log`.  
Moreover, `write` function will do a `console.log` and `writeError` function will do a `console.error`. 

## Declaration file for TypeScript users

```
declare function write(...args: any[]): void;
declare function writeError(...args: any[]): void;
```