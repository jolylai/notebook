/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildUrl(url, params, paramsSerializer) {
  if (!params) {
    return;
  }

  const serializedParams = paramsSerializer(params);
  if (serializedParams) {
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

export default buildUrl;
