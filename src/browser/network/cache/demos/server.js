const http = require('http');
const fs = require('fs');
const path = require('path');

const noCache = res => {
  res.setHeader('cache-control', 'on-store');
};

const publicCache = res => {
  res.setHeader('cache-control', 'public,max-age=600');
};

const revalidateCache = res => {
  res.setHeader('cache-control', 'max-age=0,must-revalidate');
};

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/no-cache') {
    const readStream = fs.createReadStream('assets/sample.png');
    noCache(res);
    readStream.pipe(res);
  } else if (url === '/revalidate-cache') {
    const readStream = fs.createReadStream('assets/sample.png');
    revalidateCache(res);
    readStream.pipe(res);
  } else if (url === '/public-cache') {
    const readStream = fs.createReadStream('assets/sample.png');
    publicCache(res);
    res.setHeader('content-type', 'image/png');
    readStream.pipe(res);
  } else {
    const filePath = path.resolve(__dirname, './index.html');
    const file = fs.readFileSync(filePath).toString();

    noCache(res);
    res.end(file);
  }
});

server.listen(3000, () => {
  console.log('server listen at http://localhost:3000');
});
