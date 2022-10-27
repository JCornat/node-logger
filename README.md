# node-logger

Basic Node.js logger module.

### Methods available

- debug
- info
- error
- warning
- critical

### Formatting

Methods can be formatted with any parameters.  
However, in order to have more consistency, few keys are typed :
- action
- message
- status

There is an exception for the parameter `date`, which will be overridden.   

### Example

```
import * as Log from 'node-logger-c7z'; // TypeScript way
// var Log = require('node-logger-c7z'); // JavaScript way

Log.info({message: 'Hello World!'}); // Output: {"date":"2019-02-20T17:08:36.870Z",,"message":"WAW"}
Log.debug({action: 'post', message: 'Message sent successfully', status: 200, user: 'admin'}); // Output: {"date":"2019-02-20T17:08:36.870Z","severity":"debug","action":"post","message":"Message sent successfully","status":200}
```

### Configuration

It is possible to configure the filename generated, and the directory where the files will be put.
By default, logs are written into `log` folder (sibling of `node_modules`), inside a single file `logfile`.

```
import * as path from 'path'; // TypeScript way
import * as Log from 'node-logger-c7z';

// var path = require('path'); // JavaScript way
// var Log = require('node-logger-c7z');

Log.config({directory: path.join(__dirname, 'mylogs'), filename: 'mylogfile'});
```

### Emitter / Listener

An emitter has been added, to enable users to extend the behavior to their application.  
Everytime the methods are called, an event will be fired, and can be caught by listening the `log` channel.

```
Log.emitter.addListener('log', async (data: { [key: string]: any }) => {
  // Do what you want (ex: HTTP Post to an API)
});

Log.info({message: 'Hello World!'}); // The function in the listener will be called
```
