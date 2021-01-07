import React, { useState, useRef } from 'react';
import { Progress, Button } from 'antd';

export default () => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fileRef = useRef();

  const onUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileChange = event => {
    const files = event.target.files;
    postFile(files[0]);
  };

  const postFile = file => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      setLoading(false);

      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText);
      }
    };

    xhr.onprogress = function(event) {
      console.log('lengthComputable: ', event.lengthComputable);
      const { lengthComputable, position, totalSize } = event;
      if (lengthComputable) {
        const realPrecent = (position / totalSize) * 100;
        console.log('realPrecent: ', { lengthComputable, position, totalSize });

        setPercent(realPrecent);
      }
    };

    xhr.open('post', 'https://xrtbeta.321go.com/common/file/upload', true);

    const formData = new FormData();

    formData.append('file', file);

    setLoading(true);

    xhr.send(formData);
  };

  let status = 'normal';

  if (percent == 0) {
    status = 'normal';
  } else if (percent > 0 && percent < 100) {
    status = 'active';
  } else if (percent == 100) {
    status = 'success';
  }

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <Button type="primary" onClick={onUpload}>
        上传文件
      </Button>
      {!!percent && <Progress percent={percent} status={status} />}
    </div>
  );
};
