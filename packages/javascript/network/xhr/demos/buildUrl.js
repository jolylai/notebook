import serialize from './serialize';

export default function buidUrl(url, params, paramsSerializer = serialize) {
  if (!params) return url;
  const serializedParams = paramsSerializer(params);

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex > -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}
