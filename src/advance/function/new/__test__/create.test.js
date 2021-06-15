import create from '../demos/create';

describe('constructor', () => {
  function Foo() {}
  const foo = new Foo();

  test('should an object extend Function.prototype created', () => {
    expect(foo.__proto__).toEqual(Foo.prototype);
  });

  test('should return undefined', () => {
    function Person(age) {
      this.age = age;
      return {};
    }

    const person = new Person(12);

    expect(person.age).toEqual(undefined);
  });
});

describe('create', () => {
  test('should ', () => {
    function Foo() {}
    const foo = create(Foo);
    expect(foo.__proto__).toEqual(Object().__proto__);
  });
});
