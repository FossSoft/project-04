import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from '../../redux/auth/selectors';
import { fetchWaterDataByDay } from '../../redux/water/operations';
import { useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);
  const waterData = useSelector(state => state.water.waterData);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    // console.log('Fetching data for date:', currentDate);
    // console.log('Using token:', token);

    if (currentDate && token) {
      dispatch(fetchWaterDataByDay({ date: currentDate }));
    }
  }, [dispatch, token]);

  const sortedWaterData = [...waterData].sort((a, b) => {
    const [hoursA, minutesA] = a.time.split(':').map(Number);
    const [hoursB, minutesB] = b.time.split(':').map(Number);
    return hoursA - hoursB || minutesA - minutesB;
  });

  return (
    <>
      {!sortedWaterData.length ? (
        <div className={css.textNoWater}>
          Water has not been added yet. Please add the water.
        </div>
      ) : (
        <ul className={css.list}>
          {sortedWaterData.map((item) => (
            <li key={item.id}>
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
