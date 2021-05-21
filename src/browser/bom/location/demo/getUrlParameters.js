export default function getUrlParameters(url) {
  const parts = url.match(/([^?=&]+)(=([^&]*))/g) || [];

  return parts.reduce((paramters, part) => {
    const [key, value] = part.split('=');
    paramters[key] = value;

    return paramters;
  }, {});
}
