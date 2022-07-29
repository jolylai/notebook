const fs = require('fs');
const path = require('path');

/**
 * 如果文件
 * @param {String} file file path
 * @param {Function} callback
 */
function ensureFile(file, callback) {
  function makeFile() {
    fs.writeFile(file, '', err => {
      if (err) return callback(err);
      callback();
    });
  }

  fs.stat(file, (err, stat) => {
    // 文件已存在
    if (!err && stat.isFile()) return callback();

    const dir = path.dirname(file);

    fs.stat(dir, (err, stats) => {
      if (err) {
        // 文件夹不存在则创建文件夹 然后创建文件
        if (err.code === 'ENOENT') {
          return fs.mkdir(
            dir,
            {
              recursive: true,
            },
            err => {
              if (err) return callback(err);
              makeFile();
            },
          );
        }
      }

      if (stats.isDirectory()) makeFile();
      else {
        fs.readdir(dir, err => {
          if (err) return callback(err);
        });
      }
    });
  });
}

function ensureFileSync(file) {
  let stats;
  try {
    stats = fs.statSync(file);
  } catch (error) {}

  if (status && stats.isFile()) {
    return;
  }

  const dir = path.dirname(file);

  try {
    if (!fs.statSync(dir).isDirectory()) {
      fs.readFileSync(dir);
    }
  } catch (err) {
    if (err && err.code === 'ENOENT') fs.mkdirSync(dir);
    else throw err;
  }

  fs.writeFileSync(file, '');
}
