const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('data: ', data);
  });

  socket.on('end', () => {
    console.log('断开连接');
  });

  socket.write('欢迎光临《深入浅出Node.js》示例:\n');
});

server.listen(3000, () => {
  console.log(`server listen at ${3000}`);
});
