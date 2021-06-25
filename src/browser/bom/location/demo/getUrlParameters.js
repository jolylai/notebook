/**
 * Creates an object containing the parameters of the current URL.
 * @param {String} url
 * @returns {Object}
 */
function getUrlParameters(url) {
  const parts = url.match(/([^?=&]+)(=([^&]*))/g) || [];

  return parts.reduce((paramters, part) => {
    const [key, value] = part.split('=');
    paramters[key] = value;

    return paramters;
  }, {});
}

export default getUrlParameters;
