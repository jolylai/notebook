const fs = require('fs');

const readStream = fs.createReadStream('assets/sample.png');
const writeStream = fs.createWriteStream('assets/copy.png');

readStream.pipe(writeStream);
