export const fetchBlobAndDownload = (url, name) => {
  const xhr = new XMLHttpRequest();

  xhr.open('get', url, true);

  xhr.responseType = 'blob';
  xhr.onerror = () => {
    console.error('Could not download file');
  };
  xhr.onload = () => {
    blobDownload(xhr.response, name);
  };

  xhr.send(null);
};

export const urlDownload = (url, name) => {
  const a = document.createElement('a');
  a.download = name || 'download';
  a.rel = 'noopener';

  a.href = url;

  // 同源
  if (a.origin === location.origin) {
    a.click();
    return;
  }

  //  支持跨域
  if (crosEnabled(url)) {
    fetchBlobAndDownload(url, name);
    return;
  }

  a.target = '_blank';
  a.click();
};

export const blobDownload = (blob, name) => {
  const a = document.createElement('a');
  a.download = name || 'download';
  a.rel = 'noopener';

  a.href = URL.createObjectURL(blob);

  setTimeout(() => {
    a.click();
  }, 0);

  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 40 * 1000);
};

export const crosEnabled = url => {
  const xhr = new XMLHttpRequest();

  xhr.open('HEAD', url, false);

  try {
    xhr.send();
  } catch (error) {}

  return xhr.status >= 200 && xhr.status <= 299;
};
