import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { format } from 'date-fns';

const Calendar = ({ month, date, onClick, dayWaterMonth }) => {
  if (month.length === 0) return null;
  return (
    <ul className={css.calendar}>
      {month.map((day, index) => {
        return (
          <CalendarItem
            key={index}
            day={day}
            isActive={date === format(day, 'yyyy-MM-dd')}
            onClick={onClick}
            dayWaterMonth={dayWaterMonth}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
