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
  const dispatch = useDispatch();

  // Преобразование строки даты в формат YYYY-MM-DD
  const dayNumber = parseInt(day.split('-')[2], 10);

  // Определение класса для процентов
  const percentageClass = clsx({
    [css.boldText]: percentageConsumed > 100,
  });

  const handleClick = () => {
    dispatch(setDate(day)); // Дата уже в формате YYYY-MM-DD
    if (onClick) {
      onClick(new Date(day)); // Передаем дату в формате Date
    }
  };

  return (
    <div
      className={css.container}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={clsx(css.number, {
          [css.currentDay]: day === format(new Date(), 'yyyy-MM-dd'), // Текущая дата
          [css.selectedDay]: day === format(new Date(), 'yyyy-MM-dd'), // Выбранная дата
        })}
      >
        {dayNumber}
      </div>
      <span className={clsx(css.percentages, percentageClass)}>
        {percentageConsumed > 100
          ? percentageConsumed
          : percentageConsumed < 100
          ? percentageConsumed
          : 100}
        %
      </span>
    </div>
  );
};

export default CalendarItem;
