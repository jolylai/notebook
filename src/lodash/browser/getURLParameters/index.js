/**
 * 创建一个含有URL查询参数的对象
 *
 * 1、使用 String.prototype.match() 传入正则表达式，获取获取键值对数组
 * 2、使用  Array.prototype.reduce() 遍历键值对并将其组成对象
 * @param {String} url
 */

const getURLParameters = url => {
  const reg = /([^?&=]+)=([^&]*)/g;
  const keyValPairs = url.match(reg) || [];
  const parameters = keyValPairs.reduce((a, v) => {
    const [key, value] = v.split('=');
    a[key] = value;

    return a;
  }, {});

  return parameters;
};

export default getURLParameters;
