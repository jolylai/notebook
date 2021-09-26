(() => {
  var __webpack_modules__ = {
    './src/dynamic-import.js': (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__,
    ) => {
      eval(
        `function getComponent() {
            return __webpack_require__.e(/*! import() */ \"vendors-node_modules_lodash_lodash_js\").then(__webpack_require__.t.bind(__webpack_require__, /*! lodash */ \"../../node_modules/lodash/lodash.js\", 23))
            .then(({ default: _ }) => {
                const element = document.createElement('div');
        
              element.innerText = _.concat(['Hello', 'Webpack']);
        
              return element;
                })
                  .catch(error =>
                      console.log('An error occurred while loading the component', error),
                  );
            }
              
              getComponent().then(compoment => {
                  document.body.appendChild(compoment);
              });
 `,
      );
    },
  };
})();

var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    id: moduleId,
    loaded: false,
    exports: {},
  });

  // Execute the module function
  __webpack_modules__[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__,
  );

  // Flag the module as loaded
  module.loaded = true;

  // Return the exports of the module
  return module.exports;
}
