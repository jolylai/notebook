const fs = require('fs');
const util = require('util');

const access = util.promisify(fs.access);

/**
 * 判断文件或者文件夹是否纯在
 * @param {String} path
 */
async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
}

export default exists;
