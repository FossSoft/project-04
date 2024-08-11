// src\components\MonthInfo\CalendarItem\CalendarItem.jsx
import { useDispatch } from 'react-redux';
import { setDate } from '../../../redux/water/calendar/slice';
import { format } from 'date-fns';
import clsx from 'clsx';
import css from './CalendarItem.module.css';

const CalendarItem = ({
  day, // строка с датой в формате 'YYYY-MM-DD'
  percentageConsumed, // число с процентами
  onClick, // Функция для обработки клика на день
}) => {
  console.log('Received CalendarItem percentageConsumed:', percentageConsumed); // что приходит в percentageConsumed
  const dispatch = useDispatch();

  // Преобразование строки даты в формат YYYY-MM-DD
  const dayNumber = parseInt(day.split('-')[2], 10);

  // Логика для стилизации
  const classNameWrapper = clsx(css.dayWrapper, {
    [css.currentDay]: day === format(new Date(), 'yyyy-MM-dd'), // Текущая дата
    [css.selectedDay]: day === format(new Date(), 'yyyy-MM-dd'),
    [css.highlightedBackground]: percentageConsumed > 0,
    [css.defaultBackground]: percentageConsumed === 0,
  });

  const handleClick = () => {
    dispatch(setDate(day)); // Дата уже в формате YYYY-MM-DD
    if (onClick) {
      onClick(new Date(day)); // Передаем дату в формате Date
    }
  };

  return (
    <div
      className={classNameWrapper}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={clsx(css.number, {
          [css.notFull]: percentageConsumed < 100,
        })}
      >
        {dayNumber}
      </div>
      <span className={css.percentages}>
        {percentageConsumed < 100 ? percentageConsumed : 100}%
      </span>
    </div>
  );
};

export default CalendarItem;
