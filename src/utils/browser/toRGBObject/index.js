/**
 * 1、使用 String.prototype.match() 获取字符串中的 rgb 值
 * rgb(255, 12, 0).match(/\d+/g)   =>  ["255", "12", "0"]
 * 2、将 String 数组转成 Number 数组
 * 3、结构数组并返回
 *
 * @param {String} rgbStr
 */
const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);

  return { red, green, blue };
};

export default toRGBObject;
