import React, { useRef, useState } from 'react';
import { Card, Button, message } from 'antd';

function ImageFile() {
  const inputRef = useRef();

  const [imageSrc, setImageSrc] = useState();

  const handleInputClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleChange = async e => {
    try {
      const file = e.target.files[0];

      const fileType = file.type;

      if (!/image/.test(fileType)) {
        message.warning('请选择图片');
        return;
      }

      const base64 = await getBase64(file);
      setImageSrc(base64);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Card
        hoverable
        bodyStyle={{ padding: 8 }}
        style={{ width: 240 }}
        cover={imageSrc && <img alt="example" src={imageSrc} />}
      >
        <Button type="primary" block onClick={handleInputClick}>
          选择图片
        </Button>
      </Card>
      <p className="whitespace-pre shadow max-h-40 overflow-auto">{imageSrc}</p>
    </div>
  );
}

export default ImageFile;
