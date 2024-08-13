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
import { selectWaterItems } from '../../redux/water/selectors.js';
import { setWaterDate } from '../../redux/water/slice.js';

function MonthInfo() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const currentMonth = useSelector(selectMonth); // Строка в формате 'YYYY-MM'
  const monthArray = useSelector(selectWaterData); // Данные о потреблении воды
  const selectedDate = useSelector(selectDate); // Дата в формате 'YYYY-MM-DD'
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const waterData = useSelector(selectWaterItems);

  // Функция для форматирования процентов в число
  const formatPercentage = percentage => {
    if (!percentage) return 0;

    const value = parseFloat(percentage.replace('%', ''));
    return isNaN(value) ? 0 : Math.floor(value);
  };

  // Функция для преобразования даты из формата "Month, Day" в формат "YYYY-MM-DD"
  const convertDate = (monthYear, dateStr) => {
    const [monthName, day] = dateStr.split(', ');
    const monthIndex = new Date(Date.parse(monthName + ' 1, 2020')).getMonth();
    const year = monthYear.split('-')[0];
    return format(new Date(year, monthIndex, day), 'yyyy-MM-dd');
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

 

  // Формируем массив объектов с датой и процентом
  const calendarArray = monthDay.map((date, index) => {
    const item = monthArray.find(
      item => convertDate(currentMonth, item.date) === date
    );

    const percentage = item?.percentage || '0%';


    return {
      date,
      percentage: formatPercentage(percentage),
    };
  });

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

  const handleDateClick = date => {
    dispatch(setWaterDate(date))
    dispatch(setDate(date)); // Обновляем состояние даты в Redux
  };

  useEffect(() => {
    console.log('Fetching water data for month:', currentMonth);
    dispatch(fetchWaterData(currentMonth));
  }, [dispatch, currentMonth, waterData]);

  return (
    <div className={css.container}>
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
      {isError && (
        <div className={css.errorMessage}>
          <p>An error occurred</p>
        </div>
      )}

      {isLoading && (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      )}

      <Calendar
        monthItem={calendarArray} // Передаем массив объектов с датой и процентом
        selectedDate={selectedDate}
        currentDate={format(new Date(), 'yyyy-MM-dd')}
        isActive={isActive}
        onClick={handleDateClick} // Передаем обработчик кликов
      />
    </div>
  );
}

export default MonthInfo;
