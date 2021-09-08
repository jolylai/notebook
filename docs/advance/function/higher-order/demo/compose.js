function compose(middleware) {
  /**
   * @param {Object} context 上下文对象
   * @param {Function} next  中间件执行完后最终执行的函数
   */
  return function(context, next) {
    let index = -1;

    return dispatch(0);

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;
      let fn = middleware[i];

      // 中间件执行完 最终执行 next
      if (i === middleware.length) fn = next;

      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
