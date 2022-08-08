function popstateHandler(e) {
  console.log('e: ', e);
}

function push(state, url) {
  history.pushState(state, '', url);
}

function replace(state, url) {
  history.replaceState(state, '', url);
}

(() => {
  window.addEventListener('popstate', popstateHandler);

  const user = document.getElementById('user');
  const about = document.getElementById('about');
  const back = document.getElementById('back');

  const userHandler = () => {
    const state = {
      current: '/user',
      back: '',
      forward: '',
      position: history.length,
      replaced: false,
    };

    history.pushState(state, '', '/user');
    history.replaceState(state, '', '/user');
  };
  user.addEventListener('click', userHandler, false);

  const aboutHandler = () => {
    const state = {
      current: '/about',
      back: '',
      forward: '',
      position: history.length,
      replaced: false,
    };
    history.replaceState(state, '', '/about');
  };

  about.addEventListener('click', aboutHandler, false);

  back.addEventListener('click', () => {
    history.back();
  });
})();
