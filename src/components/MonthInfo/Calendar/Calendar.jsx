import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ percentage, monthDay, selectedDate, onClick }) => {
  return (
    <ul className={css.gridWrapper}>
      {monthDay.map((date, index) => {
        // Получаем уникальный ключ для каждого элемента на основе индекса и разницы во времени
        const millisecondsToSelectedDate =
          new Date(date) - new Date(selectedDate);
        const uniqueKey = `${index}-${millisecondsToSelectedDate}`;

        return (
          <CalendarItem
            key={uniqueKey}
            day={date} // Передаем дату как строку в формате 'YYYY-MM-DD'
            percentageConsumed={percentage[index] || 0} // Передаем соответствующий процент для каждого дня
            onClick={() => {
              onClick(date); // Передаем строку даты в формате 'YYYY-MM-DD'
            }}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
