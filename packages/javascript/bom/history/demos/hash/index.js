const hashHandler = e => {
  console.log(`Old URL: ${event.oldURL}, \n New URL: ${event.newURL}`);
  console.log(`Current hash: ${location.hash}`);
};

window.addEventListener('hashchange', hashHandler, false);
