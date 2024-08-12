// src/components/MonthInfo/Calendar/Calendar.jsx
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ percentage, monthDay, onClick }) => {
  return (
    <ul className={css.gridWrapper}>
      {monthDay.map((date, index) => {
        // Используем индекс в качестве уникального ключа
        const uniqueKey = index;

        // Логирование date
        console.log('Calendar Date:', date);

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
