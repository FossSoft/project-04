import { isSameDay, format } from 'date-fns';
import clsx from 'clsx';
import css from './CalendarItem.module.css';

const CalendarItem = ({ day, isActive, onClick, dayWaterMonth }) => {
  const formattedDate = format(day, 'yyyy-MM-dd');

  // Ищем данные для текущего дня
  const dataIsWater = dayWaterMonth.find(item => item.date === formattedDate);

  // Прямо используем строку с процентом без изменений, приходит с бэкенда
  const rate = dataIsWater ? dataIsWater.percentageConsumed : '0%';

  const isCurrentDay = isSameDay(new Date(), day);

  const handleClick = () => {
    onClick(day);
  };

  return (
    <li className={css.element} onClick={handleClick}>
      <div
        className={clsx(css.number, {
          [css.active]: isActive,
          [css.current]: isCurrentDay && !isActive,
        })}
      >
        {format(day, 'd')}
      </div>
      <span className={css.rate}>{rate}</span>
    </li>
  );
};

export default CalendarItem;
