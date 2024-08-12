import React from 'react';
import ChooseDate from 'components/ChooseDate/ChooseDate';
import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import WaterList from 'components/WaterList/WaterList';
import css from './DailyInfo.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/calendar/selectors';

export default function DailyInfo() {
  const selectedDate = useSelector(selectDate);

  return (
    <div className={css.containerDailyInfo}>
      <div className={css.dataContainer}>
        <ChooseDate />
        <AddWaterBtn isPrimary={false} />
      </div>
      <WaterList selectedDate={selectedDate} />
    </div>
  );
}
