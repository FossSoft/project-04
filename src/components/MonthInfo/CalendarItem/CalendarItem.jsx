import clsx from 'clsx';
import { format } from 'date-fns';
import css from './CalendarItem.module.css';

const CalendarItem = ({ date, isCurrentDay, isSelectedDay, onClick }) => {
  // Извлекаем данные из объекта date
  const percentages = Math.floor(Number(date.percentageConsumed)) || 0;
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const dayNumber = date.day.split('-')[2]; // Извлекаем номер дня из строки даты

  return (
    // Стилизация всего календаря
    <div
      className={clsx(css.dayWrapper, {
        [css.currentDay]: isCurrentDay,
        [css.selectedDay]: isSelectedDay,
        [css.highlightedBackground]: percentages > 0 && !isCurrentDay,
        [css.defaultBackground]: percentages === 0 && !isCurrentDay,
      })}
      onClick={() => onClick(date.day)}
      style={{ cursor: 'pointer' }}
    >
      {/* Стилизация номера дня */}
      <div
        className={clsx(css.number, {
          [css.notFull]: percentages < 100,
          [css.current]: currentDate === date.day,
        })}
      >
        {dayNumber}
      </div>
      <span className={css.percentages}>
        {percentages < 100 ? percentages : 100}%
      </span>
    </div>
  );
};

export default CalendarItem;
