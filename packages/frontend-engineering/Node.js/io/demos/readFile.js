const fs = require('fs');

fs.readFile('package.json', 'utf-8', function readFile(err, data) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('data: ', data);
  }
});

fs.readFile('assets/sample.png', function readFile(err, data) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('data: ', data);
  }
});
