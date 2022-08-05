import styles from './Cats.less';

export default function Cats() {
  return (
    <div className={styles.cats}>
      <div>
        <img src={require('@/assets/cat_1.png')} />
      </div>
      <div>
        <img src={require('@/assets/cat_3.png')} />
      </div>
      <div className={styles['row-span-2']}>
        <img src={require('@/assets/cat_2.jpeg')} />
      </div>
      <div>
        <img src={require('@/assets/cat_4.png')} />
      </div>
      <div>
        <img src={require('@/assets/cat_5.png')} />
      </div>
    </div>
  );
}
