import { message } from 'antd';
import { blue, grey } from '@ant-design/colors';
import styles from './Palette.less';

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const getSelection = document.getSelection();

  const selected =
    getSelection && getSelection.rangeCount > 0
      ? getSelection.getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    getSelection && getSelection.removeAllRanges();
    getSelection && getSelection.addRange(selected);
  }
};

function Colors({ colors = [], title }) {
  const handleClick = color => {
    copyToClipboard(color);
    message.success(`${color} 已复制至剪切板`);
  };

  return (
    <div className={styles.colors}>
      <div className={styles.title}>{title}</div>
      <ul>
        {colors.map(color => (
          <li
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color)}
          />
        ))}
      </ul>
    </div>
  );
}

export default function Palette() {
  return (
    <div className={styles.palette}>
      <Colors colors={blue} title="品牌色" />
      <Colors colors={grey} title="中性色" />
    </div>
  );
}
