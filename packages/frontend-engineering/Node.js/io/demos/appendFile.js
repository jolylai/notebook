const { appendFile, appendFileSync } = require('fs');

appendFile('assets/text.txt', '追加文字', err => {
  console.log('err: ', err);
});

appendFileSync('ass');
