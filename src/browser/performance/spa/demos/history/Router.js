class Router {
  constructor() {
    this.routes = {};
  }

  init(path) {
    history.replaceState({ path }, null, path);

    this.routes[path] && this.routes[path]();
  }

  route(path, callback) {}
}
