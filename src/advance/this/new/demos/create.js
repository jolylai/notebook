export default function create(constructor, ...args) {
  // 创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  const obj = Object.create(constructor.prototype);

  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  const ret = constructor.apply(obj, args);

  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
