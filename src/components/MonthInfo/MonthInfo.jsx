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
  selectMonth,
  selectDate,
  selectIsLoading,
  selectError,
  selectWaterData,
} from '../../redux/water/calendar/selectors';
import { useState, useEffect } from 'react';
import { fetchWaterData } from '../../redux/water/calendar/operations.js';

function MonthInfo() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const currentMonth = useSelector(selectMonth); // Строка в формате 'YYYY-MM'
  const monthArray = useSelector(selectWaterData);

  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  const changeMonth = increment => {
    if (increment > 0) {
      dispatch(upMonth());
    } else if (increment < 0) {
      dispatch(downMonth());
    }
  };

  const onTodayHandler = () => {
    const today = new Date();
    dispatch(setDate(format(today, 'yyyy-MM-dd')));
  };

  const onDateSelect = date => {
    dispatch(setDate(format(date, 'yyyy-MM-dd')));
  };

  useEffect(() => {
    dispatch(fetchWaterData(currentMonth));
  }, [dispatch, currentMonth]);

  return (
    <div className={css.container}>
      <div className={css.wrapperContainer}>
        <CalendarTitle onTodayHandler={onTodayHandler} title="Month" />
        <div className={css.containerToggle}>
          <CalendarPagination
            currentDate={new Date(currentMonth)}
            changeMonth={changeMonth}
            onMonthHandler={onTodayHandler}
          />
          <CalendarToggle isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
      {isError && (
        <div className={css.errorMessage}>
          <p> An error occurred</p>
        </div>
      )}
      {isLoading && <Loader />}

      <Calendar
        monthArray={monthArray}
        date={selectedDate}
        onClick={onDateSelect}
      />
    </div>
  );
}

export default MonthInfo;
