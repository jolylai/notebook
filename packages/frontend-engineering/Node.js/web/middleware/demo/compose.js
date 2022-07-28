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

await compose(stack)({});

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose(middleware) {
  return function(context, next) {
    let index = -1;

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;

      let fn = middleware[i];

      if (i === middleware.length) {
        fn = next;
      }

      if (!fn) {
        return Promise.reject();
      }

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}
