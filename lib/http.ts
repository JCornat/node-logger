const https = require('https');

export async function post(options: {url: string, data: any}): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = new URL(options.url);
    const data = JSON.stringify(options.data);

    const httpOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const request = https.request(httpOptions, (response) => {
      let data;

      response.on('data', (chunk) => {
        console.log('chunk', chunk);
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    request.on('error', (error) => {
      console.error(error);
      reject(error);
    });

    request.write(data);
    request.end();
  });
}
