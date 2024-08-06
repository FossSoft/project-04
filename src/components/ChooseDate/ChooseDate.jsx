import React from 'react';
import { useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';
import { selectWaterDate } from '../../redux/water/selectors';
import css from './ChooseDate.module.css';

function ChooseDate() {

  const currentDate = useSelector(selectWaterDate);

  console.log('Current Date:', currentDate);

  if (!currentDate) {
    return <h3 className={css.dateTitle}>No date selected</h3>;
  }

  const formattedDate = new Date(currentDate);

  return (
    <h3 className={css.dateTitle}>
      {isSameDay(formattedDate, new Date())
        ? 'Today'
        : format(formattedDate, 'd, MMMM')}
    </h3>
  );
}

export default ChooseDate;



