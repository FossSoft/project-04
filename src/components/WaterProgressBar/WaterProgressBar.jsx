import { useEffect } from 'react';
import styles from './WaterProgressBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayProgress } from '../../redux/user/operations.js';
import {
  selectIsUserExist,
  selectTodayProgress,
  selectUserWaterToDrink,
} from '../../redux/user/selectors.js';
import { selectWaterItems } from '../../redux/water/selectors.js';

export default function WaterProgressBar() {
  const dispatch = useDispatch();
  const percents = useSelector(selectTodayProgress);
  const waterData = useSelector(selectWaterItems);
  const waterNorma = useSelector(selectUserWaterToDrink);
  const isUserExist = useSelector(selectIsUserExist);

  useEffect(() => {
    console.log('fetchTodayProgress');
    console.log(isUserExist);
    isUserExist && dispatch(fetchTodayProgress());
  }, [dispatch, waterData, waterNorma, isUserExist]);

  const numericPercents = parseFloat(percents);

  const limitedPercents = Math.min(numericPercents, 100);

  const displayPercents = `${limitedPercents}%`;

  const shouldPositionTop =
    (numericPercents >= 40 && numericPercents <= 60) ||
    (numericPercents >= 80 && numericPercents <= 100);

  return (
    <div className={styles.container}>
      <p className={styles.today}>Today</p>
      <div className={styles.progress}>
        <div className={styles.line} style={{ width: displayPercents }}>
          <div className={styles.circle}></div>
          <span
            className={`${styles.tadwyPercent} ${
              shouldPositionTop ? styles.tadwyPercentTop : ''
            }`}
          >
            {limitedPercents < 10 || limitedPercents === 50 || limitedPercents === 100 ? null : displayPercents}
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
