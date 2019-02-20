# node-logger

Basic Node.js logger module.  

### Methods available

- debug
- info
- error
- warning
- critical

### Formatting

Methods should receive an object formatted with those optionnal parameters :

- user
- action
- message
- status

### Example

```
import * as Log from 'node-logger-c7z'; // TypeScript way
// var Log = require('node-logger-c7z'); // JavaScript way

Log.info({message: 'Hello World!'}); // Output: {"date":"2019-02-20T17:08:36.870Z",,"message":"WAW"}
Log.debug({action: 'post', message: 'Message sent successfully', status: 200, user: 'admin'}); // Output: {"date":"2019-02-20T17:08:36.870Z","severity":"debug","action":"post","message":"Message sent successfully","status":200}
```

### Output file

Log is written into `log` folder (sibling of `node_modules`), inside a single file `logfile`.  
