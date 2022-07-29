const str = '中文';

for (let i = 0; i < str.length; i++) {
  console.log(str[i], str.charCodeAt(i).toString(16));
}

const buffer = Buffer.from(str, 'utf-8');

for (let item of buffer) {
  console.log('item: ', item.toString(16));
}

// console.log(buffer[0]); //72
// console.log(buffer[1]); //101
// console.log(buffer[2]); //121

console.log(buffer);
