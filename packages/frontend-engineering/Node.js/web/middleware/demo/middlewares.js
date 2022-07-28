function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const arr = [];
const stack = [];

// type Middleware<T> = (context: T, next: Koa.Next) => any;
stack.push(async (context, next) => {
  arr.push(1);
  await wait(1);
  await next();
  await wait(1);
  arr.push(6);
});

stack.push(async (context, next) => {
  arr.push(2);
  await wait(1);
  await next();
  await wait(1);
  arr.push(5);
});

stack.push(async (context, next) => {
  arr.push(3);
  await wait(1);
  await next();
  await wait(1);
  arr.push(4);
});

export default stack;
