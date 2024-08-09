import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const isValidDate = dateString => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const Calendar = ({ month, date, onClick }) => {
  if (month.length === 0) return null;

  return (
    <ul className={css.calendar}>
      {month.map((day, index) => {
        // Получаем процент как строку, или '0%' по умолчанию
        const percentageString = day.percentageConsumed || '0%';

        return (
          <CalendarItem
            key={index}
            day={day.day}
            isCurrentDay={day.day === date}
            isSelectedDay={day.day === date}
            // Передаём процент как есть, строкой
            percentage={percentageString}
            onClick={() => {
              if (isValidDate(day.day)) {
                onClick(day.day);
              } else {
                console.error('Invalid date value:', day.day);
              }
            }}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
