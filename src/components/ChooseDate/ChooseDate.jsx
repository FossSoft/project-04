import React from 'react';
import { useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';
import { selectWaterDate } from '../../redux/water/selectors';
import css from './ChooseDate.module.css';

function ChooseDate() {
  const currentDate = useSelector(selectWaterDate);

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
