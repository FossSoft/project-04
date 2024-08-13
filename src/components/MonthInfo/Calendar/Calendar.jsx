import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ monthItem, onClick, currentDate, selectedDate, isActive }) => {
  console.log('currentDate from Calendar:', currentDate);
console.log('selectedDate from Calendar:', selectedDate);
  return (
    <ul className={css.gridWrapper}>
      {monthItem.map(({ date, percentage }, index) => {
        const uniqueKey = index;
        const isActiveItem = selectedDate === date;

        return (
          <CalendarItem
            key={uniqueKey}
            day={date}
            percentageConsumed={percentage}
            onClick={onClick}
            currentDate={currentDate} // Передаем текущую дату
            selectedDate={selectedDate}
            isActive={isActiveItem} // Передаем, активен ли элемент
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
