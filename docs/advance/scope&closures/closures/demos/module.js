function MyModule() {
  const modules = {};

  function define(name, deps, impl) {
    const depModules = deps.map(name => modules[name]);
    console.log('depModules: ', depModules);
    modules[name] = impl.apply(impl, depModules);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  };
}

const Module = MyModule();

Module.define('foo', [], () => {
  console.log('foo');
});

Module.define('bar', ['foo'], foo => {
  foo();
  console.log('bar');
});
