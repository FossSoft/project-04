import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import clsx from 'clsx';

import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import Loader from './Loader/Loader';
import Statistics from './Statistics/Statistics';
import sprite from '../../image/sprite/sprite.svg';
import { apiGetWaterMonth } from '../../redux/water/operations';
import {
  incrementMonth,
  decrementMonth,
  setToggleInfo,
  setDate,
} from '../../redux/water/slice';
import {
  selectWaterMonth,
  selectisLoadingMonth,
  selectMonthError,
  selectToggleInfo,
  selectMonth,
  selectDate,
} from '../../redux/water/selectors';

import css from './MonthInfo.module.css';

const MonthInfo = () => {
  const dispatch = useDispatch();

  const monthArray = useSelector(selectWaterMonth);
  const currentMonth = useSelector(selectMonth);
  const isLoading = useSelector(selectisLoadingMonth);
  const isError = useSelector(selectMonthError);
  const ToggleInfo = useSelector(selectToggleInfo);
  const selectedDate = useSelector(selectDate);

  const formattedMonthArray = useMemo(() => {
    return monthArray.map(day => {
      return {
        id: day.id,
        date: day.day.split('-')[2],
        value: Math.floor(Number(day.totalAmount) * 1000),
      };
    });
  }, [monthArray]);

  const onNextMonth = () => {
    dispatch(incrementMonth());
  };
  const onPrevMonth = () => {
    dispatch(decrementMonth());
  };

  const onToggleInfo = () => {
    dispatch(setToggleInfo());
  };
  const onDayChange = date => {
    dispatch(setDate(date));
  };
  const handleTodayClick = date => {
    dispatch(setDate(format(date, 'yyyy-MM-dd')));
  };

  useEffect(() => {
    dispatch(apiGetWaterMonth(currentMonth));
  }, [dispatch, currentMonth]);

  return (
    <div>
      <div className={css.wrapper} data-tour="step-8">
        <div className={css.thead}>
          <h3 className={css.title}>{ToggleInfo ? 'Month' : 'Statistics'}</h3>
          <div className={css.pagination}>
            <CalendarPagination
              onNextMonth={onNextMonth}
              onPrevMonth={onPrevMonth}
              onTodayClick={handleTodayClick}
              setSelectedDate={setDate}
              isStatisticsOpen={!ToggleInfo}
            />
            <button
              className={clsx(css.iconBtn, {
                [css.active]: !ToggleInfo,
              })}
              onClick={onToggleInfo}
              data-tour="step-9"
            >
              <svg width="20" height="20">
                <use href={`${sprite}#pie-chart-02`} />
              </svg>
            </button>
          </div>
        </div>
        {isError && (
          <div className={css.errorMessage}>
            <p>Error loading data</p>
          </div>
        )}

        {isLoading && !isError && <Loader />}

        {ToggleInfo && !isError && !isLoading && (
          <Calendar
            month={monthArray}
            date={selectedDate}
            onClick={onDayChange}
          />
        )}

        {!ToggleInfo && !isError && !isLoading && (
          <Statistics data={formattedMonthArray} />
        )}
      </div>
    </div>
  );
};

export default MonthInfo;
