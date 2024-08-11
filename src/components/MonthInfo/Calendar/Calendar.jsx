// src/components/MonthInfo/Calendar/Calendar.jsx
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ monthArray, monthDay, selectedDate, onClick }) => {
  return (
    <ul className={css.gridWrapper}>
      {monthDay.map((date, index) => {
        const percentage =
          monthArray.find(item => item.date === date)?.percentage || '0%';

        const millisecondsToSelectedDate =
          new Date(date) - new Date(selectedDate);
        const uniqueKey = `${index}-${millisecondsToSelectedDate}`;

        return (
          <CalendarItem
            key={uniqueKey}
            day={date} // Передаем дату как строку в формате 'YYYY-MM-DD'
            percentageConsumed={percentage} // Передаем процент как строку
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
