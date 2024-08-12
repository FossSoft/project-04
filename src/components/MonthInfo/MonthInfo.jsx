//\src\components\MonthInfo\MonthInfo.jsx
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Calendar from '../MonthInfo/Calendar/Calendar.jsx';
import CalendarPagination from '../MonthInfo/CalendarPagination/CalendarPagination.jsx';
import CalendarTitle from '../MonthInfo/CalendarTitle/CalendarTitle.jsx';
import CalendarToggle from './CalendarToggle/CalendarToggle.jsx';

import Loader from '../MonthInfo/Loader/Loader.jsx';
import css from './MonthInfo.module.css';
import { upMonth, downMonth, setDate } from '../../redux/water/calendar/slice';
import {
  selectWaterData,
  selectMonth,
  selectDate,
  selectIsLoading,
  selectError,
} from '../../redux/water/calendar/selectors';
<<<<<<< Updated upstream
=======
import { useState, useEffect } from 'react';
import { fetchWaterData } from '../../redux/water/calendar/operations.js';
import { setWaterDate } from '../../redux/water/slice.js';
>>>>>>> Stashed changes

function MonthInfo() {
  const dispatch = useDispatch();

  const currentMonth = useSelector(selectMonth); // Строка в формате 'YYYY-MM'
  const monthArray = useSelector(selectWaterData);

  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  const onNextMonth = () => {
    dispatch(upMonth());
  };

  const onPrevMonth = () => {
    dispatch(downMonth());
  };

  const onTodayHandler = () => {
    const today = new Date();
    dispatch(setDate(format(today, 'yyyy-MM-dd')));
  };

  const onDateSelect = date => {
<<<<<<< Updated upstream
    dispatch(setDate(format(date, 'yyyy-MM-dd')));
=======
    const formattedDate = format(date, 'yyyy-MM-dd');
    // dispatch(setDate(formattedDate));
    dispatch(setWaterDate(formattedDate))
>>>>>>> Stashed changes
  };

  return (
    <div className={css.container}>
      <div className={css.wrapperContainer}>
        <CalendarTitle onTodayHandler={onTodayHandler} title="Month" />
        <div className={css.containerToggle}>
          <CalendarPagination
            currentDate={new Date(currentMonth)}
            onPrevHandler={onPrevMonth}
            onMonthHandler={onTodayHandler}
            onNextHandler={onNextMonth}
          />
          <CalendarToggle />
        </div>
      </div>
      {isError && (
        <div className={css.errorMessage}>
          <p> An error occurred</p>
        </div>
      )}
      {isLoading && <Loader />}

      <Calendar month={monthArray} date={selectedDate} onClick={onDateSelect} />
    </div>
  );
}

export default MonthInfo;
