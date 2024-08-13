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
  const dayNumber = parseInt(day.split('-')[2], 10);
  const cappedPercentage = Math.min(percentageConsumed, 100);

  return (
    <div className={css.container} onClick={() => onClick(day)}>
      <div
        className={clsx(css.number, {
          [css.bgHighlighted]: cappedPercentage < 100,
          [css.current]: currentDate === day ,
            })}
      >
        {dayNumber}
      </div>
      <span className={css.percentages}>{cappedPercentage}%</span>
    </div>
  );
};

export default CalendarItem;
