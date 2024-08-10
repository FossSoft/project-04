//src\components\MonthInfo\CalendarPagination\CalendarPagination.jsx
import { addMonths, subMonths, format } from 'date-fns';
import { useState } from 'react';
import css from './CalendarPagination.module.css';

const CalendarPagination = ({ currentDate, onMonthHandler }) => {
  const [date, setDate] = useState(currentDate);

  const handlePrev = () => {
    setDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNext = () => {
    setDate(prevDate => addMonths(prevDate, 1));
  };

  const month = format(date, 'MMMM');
  const year = format(date, 'yyyy');

  return (
    <div className={css.wrapperButtons}>
      <button className={css.chevronButton} onClick={handlePrev}>
        &lt;
      </button>
      <button
        onClick={onMonthHandler}
        className={css.monthButton}
      >{`${month}, ${year}`}</button>
      <button className={css.chevronButton} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default CalendarPagination;
