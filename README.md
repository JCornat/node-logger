#node-logger

Basic Node.js logger module.  
Writes inside `../../log` folder.

##How to use

```
import * as Log from "node-logger-c7z";

Log.write('WAW');
Log.writeError(error, myArray, randomObject);
```

## Declaration file

```
declare function write(...args: any[]): void;
declare function writeError(...args: any[]): void;
```