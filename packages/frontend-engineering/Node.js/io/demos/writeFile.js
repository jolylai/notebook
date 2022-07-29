const fs = require('fs');

const fileContent = '文件内容';

fs.writeFile('test.txt', fileContent, function(err) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('写入成功');
  }
});
