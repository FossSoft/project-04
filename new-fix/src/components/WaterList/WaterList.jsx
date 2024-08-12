import React from 'react';
import { useFetchWaterData } from '../../hooks/useWater';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
  const { waterData } = useFetchWaterData();

  const sortedWaterData = [...waterData].sort((a, b) => {
    const [hoursA, minutesA] = (a.time || '').split(':').map(Number);
    const [hoursB, minutesB] = (b.time || '').split(':').map(Number);
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
            <li key={item.id} >
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
