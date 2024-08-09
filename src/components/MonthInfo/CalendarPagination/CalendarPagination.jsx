import css from './CalendarPagination.module.css';
import { format } from 'date-fns';

const CalendarPagination = ({
  currentDate,
  onPrevHandler,
  onMonthHandler,
  onNextHandler,
}) => {
  const month = format(currentDate, 'MMMM');
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = format(currentDate, 'yyyy');

  return (
    <div className={css.wrapperButtons}>
      <button className={css.chevronButton} onClick={onPrevHandler}>
        &lt;
      </button>
      <button
        onClick={onMonthHandler}
        className={css.monthButton}
      >{`${capitalizedMonth}, ${year}`}</button>
      <button className={css.chevronButton} onClick={onNextHandler}>
        &gt;
      </button>
    </div>
  );
};

export default CalendarPagination;
