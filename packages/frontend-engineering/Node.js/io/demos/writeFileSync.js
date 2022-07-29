const fs = require('fs');

const fileContent = '同步写入文件内容';

try {
  fs.writeFileSync('test.txt', fileContent);
} catch (error) {
  console.log('error: ', error);
}
