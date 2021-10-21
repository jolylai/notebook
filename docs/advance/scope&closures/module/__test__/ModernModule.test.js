import ModernModule from '../demos/ModernModule';

describe('ModernModule', () => {
  test('should define module', () => {
    ModernModule.define('math', [], function() {
      function add(a, b) {
        return a + b;
      }

      return { add };
    });

    ModernModule.define('index', ['math'], function(math) {
      const result = math.add(1, 2);
      expect(result).toBe(3);
    });
  });
});
