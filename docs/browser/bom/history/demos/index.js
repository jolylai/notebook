function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listener = [];
  let teardowns = [];
  // TODO: should it be a stack? a Dict. Check if the popstate listener
  // can trigger twice
  let pauseState = null;

  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from: HistoryLocation = currentLocation.value;
    const fromState: StateEntry = historyState.value;
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

  function listen(callback: NavigationCallback) {
    // setup the listener and prepare teardown callbacks
    listeners.push(callback);

    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };

    teardowns.push(teardown);
    return teardown;
  }

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
