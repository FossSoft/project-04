import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Calendar from './Calendar/Calendar.jsx';
import CalendarPagination from './CalendarPagination/CalendarPagination.jsx';
import CalendarTitle from './CalendarTitle/CalendarTitle.jsx';
import CalendarToggle from './CalendarToggle/CalendarToggle.jsx';
import Loader from './Loader/Loader.jsx';
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
import { setWaterDate } from '../../redux/water/slice.js';

function MonthInfo() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const currentMonth = useSelector(selectMonth); // Строка в формате 'YYYY-MM'
  const monthArray = useSelector(selectWaterData); // Данные о потреблении воды
  const selectedDate = useSelector(selectDate); // Дата в формате 'YYYY-MM-DD'
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  // Функция для форматирования процентов в число
  const formatPercentage = percentage => {
    if (!percentage) return 0;

    const value = parseFloat(percentage.replace('%', ''));
    return isNaN(value) ? 0 : Math.floor(value);
  };

  // Переменная для форматированного процента
  const percentageNumber = monthArray.map(item =>
    formatPercentage(item.percentage)
  );

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
    const formattedDate = format(date, 'yyyy-MM-dd');
    // dispatch(setDate(formattedDate));
    dispatch(setWaterDate(formattedDate))
  };

  // Генерация массива дней для текущего месяца
  const getMonthDaysArray = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return format(new Date(year, month, day), 'yyyy-MM-dd');
    });
  };

  // Получаем текущий год и месяц из currentMonth
  const year = parseInt(currentMonth.split('-')[0], 10);
  const month = parseInt(currentMonth.split('-')[1], 10) - 1;
  const monthDay = getMonthDaysArray(year, month);

  useEffect(() => {
    dispatch(fetchWaterData(currentMonth));
  }, [dispatch, currentMonth]);

  return (
    <div className={css.container}>
      {/* <div className={css.wrapperContainer}> */}
      <div className={css.containerHeader}>
        <CalendarTitle onTodayHandler={onTodayHandler} title="Month" />
        <div className={css.containerToggle}>
          <CalendarPagination
            currentDate={new Date(year, month, 1)}
            changeMonth={changeMonth}
            onMonthHandler={onTodayHandler}
          />
          <CalendarToggle isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
      {/* </div> */}
      {isError && (
        <div className={css.errorMessage}>
          <p>An error occurred</p>
        </div>
      )}

      {isLoading && <Loader />}
      <Calendar
        percentage={percentageNumber}
        monthDay={monthDay}
        selectedDate={selectedDate}
        onClick={onDateSelect}
      />
    </div>
  );
}

export default MonthInfo;
