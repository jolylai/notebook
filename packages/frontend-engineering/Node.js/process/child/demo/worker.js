const http = require('http');

const worker = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('worker');
});

const PORT = Math.round((1 + Math.random()) * 1000);

worker.listen(PORT, () => {
  console.log(`worker listen at ${PORT}`);
});
