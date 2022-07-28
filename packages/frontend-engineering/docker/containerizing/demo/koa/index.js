const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
  ctx.body = 'koa service';
});

app.listen(3000, () => {
  console.log('koa server listen at: http://localhost:3000');
});
