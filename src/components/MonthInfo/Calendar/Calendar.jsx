import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ monthItem, onClick }) => {
  return (
    <ul className={css.gridWrapper}>
      {monthItem.map(({ date, percentage }, index) => {
        const uniqueKey = index;

        // Логирование date и percentage
        console.log('Calendar Date:', date);
        console.log('Calendar Percentage:', percentage);

        return (
          <CalendarItem
            key={uniqueKey}
            day={date} // Передаем дату как строку в формате 'YYYY-MM-DD'
            percentageConsumed={percentage} // Передаем соответствующий процент для каждого дня
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
