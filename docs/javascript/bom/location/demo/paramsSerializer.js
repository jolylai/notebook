/**
 * Serializ an object to url params
 * @param {Object} params
 * @param {String} Returns serialied url string
 */
function paramsSerializer(params) {
  const parts = [];

  for (let key in params) {
    let value = params[key];

    if (value == null) return;

    if (Array.isArray(value)) {
      key = `${key}[]`;
    } else {
      value = [value];
    }

    value.forEach(val => {
      if (Object.prototype.toString.call(val) === '[object Date]') {
        val = val.toISOString();
      } else if (Object.prototype.toString.call(val) === '[object Object]') {
        val = JSON.stringify(val);
      }

      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    });
  }

  return parts.join('&');
}

export default paramsSerializer;
