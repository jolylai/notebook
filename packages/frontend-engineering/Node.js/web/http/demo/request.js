const http = require('http');

const options = {
  hostnmae: 'localhost',
  port: 3001,
  path: '/',
  // url: 'http://localhost:3001',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getResponseData = stream => {
  return new Promise((resolve, reject) => {
    const responseBuffer = [];

    stream.on('data', chunk => {
      responseBuffer.push(chunk);
    });

    stream.on('end', () => {
      const responseData = Buffer.concat(responseBuffer);

      resolve(responseData.toString());
    });

    stream.on('error', err => {
      reject(err);
    });
  });
};

const request = http.request(options, async res => {
  console.log(`状态码 ${res.statusCode}`);

  const responseData = await getResponseData(res);
  console.log('responseData: ', responseData);
});

request.on('error', err => {
  console.log('err: ', err);
});

const data = JSON.stringify({
  type: 'Node.js',
});

request.write(data);
request.end();
