// src/components/MonthInfo/CalendarPagination/CalendarPagination.jsx
import { addMonths, subMonths, format } from 'date-fns';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import css from './CalendarPagination.module.css';

const CalendarPagination = ({ currentDate, changeMonth, onMonthHandler }) => {
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  const handlePrev = () => {
    const newDate = subMonths(date, 1);
    setDate(newDate);
    changeMonth(-1);
  };

  const handleNext = () => {
    const newDate = addMonths(date, 1);
    setDate(newDate);
    changeMonth(1);
  };

  const month = format(date, 'MMMM');
  const year = format(date, 'yyyy');

  return (
    <div className={css.wrapperButtons}>
      <button onClick={handlePrev} className={css.chevronButton}>
        <FaChevronLeft />
      </button>
      <button onClick={onMonthHandler} className={css.monthButton}>
        {`${month}, ${year}`}
      </button>
      <button onClick={handleNext} className={css.chevronButton}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CalendarPagination;
