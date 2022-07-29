const fs = require('fs');
const path = require('path');
const util = require('util');

const stat = util.promisify(fs.stat);

fs.stat('assets/text.txt', (err, stat) => {
  if (err) {
    console.log('err: ', err);
    return;
  }

  console.log('stat: ', stat);
  console.log('isFile', stat.isFile());
  console.log('isDir', stat.isDirectory());
});

fs.lstat('assets/text.txt', (err, stat) => {
  if (err) {
    console.log('err: ', err);
    return;
  }

  console.log('stat: ', stat);
  console.log('isFile', stat.isFile());
  console.log('isDir', stat.isDirectory());
});
