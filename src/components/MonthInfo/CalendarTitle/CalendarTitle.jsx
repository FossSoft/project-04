import { MdToday } from 'react-icons/md';
import css from './CalendarTitle.module.css';

const CalendarTitle = ({ onTodayHandler, title }) => {
  return (
    <div className={css.textWrapper}>
      {title} <MdToday className={css.todayIcon} onClick={onTodayHandler} />
    </div>
  );
};

export default CalendarTitle;
