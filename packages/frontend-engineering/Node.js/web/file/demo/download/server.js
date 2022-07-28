const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');

const access = util.promisify(fs.access);

const exists = async path => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};

const downloadPathReg = /^\/download\/(.+)/;

const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
  txt: 'text/plain',
};

const server = http.createServer(async (req, res) => {
  const match = req.url.match(downloadPathReg);

  if (!match) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const filename = match[1];
  const filePath = path.resolve('assets', filename);
  const isExists = await exists(filePath);

  if (!isExists) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const ext = path.extname(filename).substr(1);

  res.setHeader('Content-Type', mimeTypes[ext]);
  res.setHeader('Content-Disposition', 'attachment; filename="sample.jpg"');

  res.statusCode = 200;
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3000, () => {
  console.log(`server listen at http://localhost:3000`);
});
