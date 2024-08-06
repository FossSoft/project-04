import { useSelector } from 'react-redux';
import { selectWaterItems } from '../../redux/water/selectors';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
  const waterDay = useSelector(selectWaterItems);

  return (
    <>
      {!waterDay?.length ? (
        <div className={css.textNoWater}>
          Water has not been added yet. Please add the water.
        </div>
      ) : (
        <ul className={css.list}>
          {waterDay.map((item) => (
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



