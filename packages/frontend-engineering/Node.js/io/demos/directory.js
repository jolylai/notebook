const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, '..');

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(files);
});

const files = fs.readdirSync(dir);
console.log('files: ', files);
