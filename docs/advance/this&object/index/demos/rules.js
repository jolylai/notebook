function bar() {
  console.log(this.a);
}

var a = 2;

(function() {
  'use strict';
  bar();
})();
