function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  // TODO: should it be a stack? a Dict. Check if the popstate listener
  // can trigger twice
  let pauseState = null;

  // 后退
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;

    if (state) {
      currentLocation.value = to;
      historyState.value = state;

      // ignore the popstate and reset the pauseState
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      // 第一页
      replace(to);
    }

    // console.log({ deltaFromCurrent })
    // Here we could also revert the navigation by calling history.go(-delta)
    // this listener will have to be adapted to not trigger again and to wait for the url
    // to be updated before triggering the listeners. Some kind of validation function would also
    // need to be passed to the listeners so the navigation can be accepted
    // call all listeners
    listeners.forEach(listener => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta
          ? delta > 0
            ? NavigationDirection.forward
            : NavigationDirection.back
          : NavigationDirection.unknown,
      });
    });
  };

  function pauseListeners() {
    pauseState = currentLocation.value;
  }

  function listen(callback) {
    // setup the listener and prepare teardown callbacks
    listeners.push(callback);

    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };

    teardowns.push(teardown);
    return teardown;
  }

  // 页面卸载前记录当前滚动条位置
  function beforeUnloadListener() {
    const { history } = window;
    if (!history.state) return;
    history.replaceState(
      assign({}, history.state, { scroll: computeScrollPosition() }),
      '',
    );
  }

  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener('popstate', popStateHandler);
    window.removeEventListener('beforeunload', beforeUnloadListener);
  }

  // setup the listeners and prepare teardown callbacks
  window.addEventListener('popstate', popStateHandler);
  window.addEventListener('beforeunload', beforeUnloadListener);

  return {
    pauseListeners,
    listen,
    destroy,
  };
}

const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
});

function buildState(back, current, forward, replaced, computeScroll) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null,
  };
}

function useHistoryStateNavigation() {
  /**
   * 修改当前页面状态
   * @param {String} to
   */
  function replace(to) {
    const state = Object.assign({}, history.state, {
      current: to,
      replaced: true,
    });

    history.replaceState(state, '', to);
  }

  function push(to) {
    const state = Object.assign({}, buildState(location.pathname, to, null));

    history.replaceState(state, '', to);
  }

  return {
    location: location.pathname,
    state: history.state,

    push,
    replace,
  };
}
