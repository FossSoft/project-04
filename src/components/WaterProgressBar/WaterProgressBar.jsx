import { useEffect } from 'react';
import styles from './WaterProgressBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayProgress } from '../../redux/user/operations.js';
import { selectTodayProgress } from '../../redux/user/selectors.js';
import { selectWaterItems } from '../../redux/water/selectors.js';

export default function WaterProgressBar() {
  const dispatch = useDispatch();
  const percents = useSelector(selectTodayProgress);
  const waterData = useSelector(selectWaterItems);

  useEffect(() => {
    dispatch(fetchTodayProgress());
  }, [dispatch, waterData]);

  return (
    <div className={styles.container}>
      <p className={styles.today}>Today</p>
      <div className={styles.progress}>
        <div className={styles.line} style={{ width: `${percents}` }}>
          <div className={styles.circle}></div>
          <span className={styles.tadwyPercent}>
            {percents === '0%' || percents === '50%' || percents === '100%'
              ? null
              : percents}
          </span>
        </div>
      </div>

      <div className={styles.percents}>
        <span className={styles.itemPercent1}>0%</span>
        <span className={styles.itemPercent2}>50%</span>
        <span className={styles.itemPercent3}>100%</span>
      </div>
    </div>
  );
}
