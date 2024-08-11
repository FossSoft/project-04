// src\components\MonthInfo\CalendarItem\CalendarItem.jsx
import { useDispatch } from 'react-redux';
import { setDate } from '../../../redux/water/calendar/slice';
import { format } from 'date-fns';
import clsx from 'clsx';
import css from './CalendarItem.module.css';

const CalendarItem = ({
  day, // строка с датой в формате 'YYYY-MM-DD'
  percentageConsumed, // строка с процентами, например '13%'
  onClick, // Функция для обработки клика на день
}) => {
  const dispatch = useDispatch();

  // Логирование данных
  console.log('Received day:', day);
  console.log('Received percentage:', percentageConsumed);

  // Преобразование строки даты в формат YYYY-MM-DD
  const dayNumber = day.split('-')[2];
  const percentages =
    Math.floor(Number(percentageConsumed.replace('%', ''))) || 0; // Удаление '%' и преобразование в число

  // Логика для стилизации
  const classNameWrapper = clsx(css.dayWrapper, {
    [css.currentDay]: day === format(new Date(), 'yyyy-MM-dd'), // Текущая дата
    [css.selectedDay]: day === format(new Date(), 'yyyy-MM-dd'),
    [css.highlightedBackground]: percentages > 0,
    [css.defaultBackground]: percentages === 0,
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
      <div className={clsx(css.number, { [css.notFull]: percentages < 100 })}>
        {dayNumber}
      </div>
      <span className={css.percentages}>
        {percentages < 100 ? percentages : 100}%
      </span>
    </div>
  );
};

export default CalendarItem;
