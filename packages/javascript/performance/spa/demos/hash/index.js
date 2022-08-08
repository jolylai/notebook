import Router from './router';

(() => {
  window.miniHashRouter = new Router();

  miniHashRouter.push('/', () => {
    console.log('page1');
  });

  miniHashRouter.push();
})();
