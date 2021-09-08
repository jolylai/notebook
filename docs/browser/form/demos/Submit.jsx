import React from 'react';
import styles from './Submit.less';

function Submit() {
  const handleSubmit = evnet => {
    console.log('evnet: ', evnet);
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input />
      <input type="submit" value="提交" />
      <input
        style={{ width: 24, height: 24 }}
        type="image"
        src="https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/pomelo.svg"
      />
    </form>
  );
}

export default Submit;
