const http = require('http');
const fs = require('fs');

const getRequestBody = stream => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);

      resolve(buffer);
    });

    stream.on('error', err => {
      reject(err);
    });
  });
};

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'success';

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.end('success');
    return;
  }

  const data = await getRequestBody(req);
  console.log('data: ', data.length);

  req.pipe(res);
});

server.listen(3000, () => {
  console.log(`server listen at http://localhost:3000`);
});
