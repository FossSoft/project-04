import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const isValidDate = dateString => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const Calendar = ({ monthArray, date, onClick }) => {
  if (monthArray.length === 0) return null;

  return (
    <ul className={css.calendar}>
      {monthArray.map((day, index) => {
        const percentageString = day.percentage || '0%';

        return (
          <CalendarItem
            key={index}
            day={day.date} // Передаем дату как строку в формате 'YYYY-MM-DD'
            percentageConsumed={percentageString} // Передаем процент как строку
            onClick={() => {
              if (isValidDate(day.date)) {
                onClick(day.date); // Передаем строку даты в формате 'YYYY-MM-DD'
              } else {
                console.error('Invalid date value:', day.date);
              }
            }}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
