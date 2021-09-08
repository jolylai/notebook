const ModernModule = (() => {
  const modules = {};

  /**
   * 定义模块
   * @param {String} name 模块名称
   * @param {Array} deps 依赖模块名称
   * @param {Function} impl 模块函数
   */
  const define = (name, deps, impl) => {
    const depModules = deps.map(depName => modules[depName]);

    modules[name] = impl.apply(impl, depModules);
  };

  const get = name => {
    return modules[name];
  };

  return { define, get };
})();

export default ModernModule;
