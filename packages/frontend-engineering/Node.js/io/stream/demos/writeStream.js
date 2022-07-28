const fs = require('fs');

const writeStream = fs.createWriteStream('assets/text.txt');

writeStream.write('我写入了一行\n');
writeStream.write('我又写入了一行\n');
writeStream.write('我再写入了一行\n');
writeStream.end();
