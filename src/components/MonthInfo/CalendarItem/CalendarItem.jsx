import clsx from 'clsx';
import css from './CalendarItem.module.css';

const CalendarItem = ({
  day,
  isCurrentDay,
  isSelectedDay,
  percentage,
  onClick,
}) => {
  const percentageNumber = parseFloat(percentage) || 0;

  return (
    <div
      className={clsx(css.dayWrapper, {
        [css.currentDay]: isCurrentDay,
        [css.selectedDay]: isSelectedDay,
        [css.highlightedBackground]: percentageNumber > 0 && !isCurrentDay,
        [css.defaultBackground]: percentageNumber === 0 && !isCurrentDay,
      })}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {day}
      {/* Рендерим проценты напрямую без изменений */}
      <div className={css.percentage}>{percentage}</div>
    </div>
  );
};

export default CalendarItem;
