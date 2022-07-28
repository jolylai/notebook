const http = require('http');

const getRequestData = req => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      console.log('chunk: ', chunk);
      data += chunk;
    });

    req.on('end', () => {
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  const { url, method, httpVersion, headers } = req;
  console.log('req: ', { url, method, httpVersion, headers });
  // const data = await getRequestData(req);
  // console.log(`data ${data}`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Node.js\n');
});

const PORT = 3000;

server.listen(3000, () => {
  console.log(`server listen at http://localhost:${PORT}`);
});
