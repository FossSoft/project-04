import clsx from 'clsx';
import css from './CalendarItem.module.css';

const CalendarItem = ({
  day,
  percentageConsumed,
  onClick,
  currentDate,
  selectedDate,
  isActive,
}) => {
  // Преобразование строки даты в формат YYYY-MM-DD
  const dayNumber = parseInt(day.split('-')[2], 10);

  // Логирование значения percentageConsumed
  console.log('percentageConsumed:', percentageConsumed);

  // Капирование процента (максимум 100)
  const cappedPercentage = Math.min(percentageConsumed, 100);

  return (
    <div className={css.container} onClick={() => onClick(day)}>
      <div
        className={clsx(css.number, {
          [css.notComplete]: cappedPercentage > 0 && cappedPercentage < 100,
          [css.active]: selectedDate === day && isActive,
          [css.current]: currentDate === day && !isActive,
        })}
      >
        {dayNumber}
      </div>
      <span className={css.percentages}>{cappedPercentage}%</span>
    </div>
  );
};

export default CalendarItem;
