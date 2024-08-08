import React from 'react';
import { useSelector } from 'react-redux';
import { addMonths, subMonths, format, isValid } from 'date-fns';
import clsx from 'clsx';
import { selectDate } from '../../../../redux/water/selectors';
import style from './CalendarPagination.module.css';
import sprite from '../../image/sprite/sprite.svg';

const CalendarPagination = ({
  onNextMonth,
  onPrevMonth,
  onTodayClick,
  setSelectedDate,
  isStatisticsOpen,
}) => {
  const selectedDate = useSelector(selectDate);
  const date = new Date(selectedDate);

  // Проверяем, является ли текущая дата выбранной
  const isTodayVisible = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return selectedDate !== today;
  };

  // Обработка нажатия кнопки "Сегодня"
  const handleTodayClick = () => {
    onTodayClick(new Date());
  };

  // Обработка нажатия кнопки для предыдущего месяца
  const handlePrevMonth = () => {
    if (!isStatisticsOpen) {
      setSelectedDate(prevDate => subMonths(prevDate, 1));
      onPrevMonth();
    }
  };

  // Обработка нажатия кнопки для следующего месяца
  const handleNextMonth = () => {
    if (!isStatisticsOpen) {
      setSelectedDate(prevDate => addMonths(prevDate, 1));
      onNextMonth();
    }
  };

  const buttonClass = isStatisticsOpen
    ? style.paginationDisabled
    : style.button;
  const paginationClass = clsx(style.pagination, {
    [style.boxPaginationDisabled]: isStatisticsOpen,
  });

  return (
    <>
      <section className={style.calendarSection}>
        {isTodayVisible() && (
          <button className={style.buttonToday} onClick={handleTodayClick}>
            Today
          </button>
        )}
        <nav className={paginationClass} aria-label="Calendar Navigation">
          <button
            className={buttonClass}
            onClick={handlePrevMonth}
            disabled={isStatisticsOpen}
          >
            <svg className={style.icon} aria-hidden="true">
              <use href={`${sprite}#icon-chevron-up`} />
            </svg>
          </button>
          <span className={style.date}>
            {selectedDate && isValid(date) && format(date, 'yyyy-MM-dd')}
          </span>
          <button
            className={buttonClass}
            onClick={handleNextMonth}
            disabled={isStatisticsOpen}
          >
            <svg className={style.icon} aria-hidden="true">
              <use href={`${sprite}#icon-chevron-down`} />
            </svg>
          </button>
        </nav>
      </section>
    </>
  );
};

export default CalendarPagination;
