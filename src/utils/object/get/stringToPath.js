const regexp = /\[([^\[\]]*)\]/g;

function stringToPath(string) {
  return string
    .replace(regexp, '.$1.')
    .split('.')
    .filter(property => property !== '');
}

export default stringToPath;
