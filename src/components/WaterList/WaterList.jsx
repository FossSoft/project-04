import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors';
import { fetchWaterDataByDay } from '../../redux/water/operations';
import { useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const waterData = useSelector(state => state.water.waterData);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    console.log('Fetching data for date:', currentDate);
    console.log('Using token:', token);

    if (currentDate && token) {
      dispatch(fetchWaterDataByDay({ date: currentDate }));
    }
  }, [dispatch, token]);

  return (
    <>
      {!waterData.length ? (
        <div className={css.textNoWater}>
          Water has not been added yet. Please add the water.
        </div>
      ) : (
        <ul className={css.list}>
          {waterData.map((item) => (
            <li key={item._id}>
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
