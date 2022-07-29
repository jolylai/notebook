const fs = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, '../index.md');

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log('data: ', data);
} catch (err) {
  // 出错了
}

const imgPath = resolve(__dirname, './jucy-beef-burger.jpg');

try {
  const buffer = fs.readFileSync(imgPath);
  console.log('buffer: ', buffer);
} catch (err) {
  // 出错了
}
