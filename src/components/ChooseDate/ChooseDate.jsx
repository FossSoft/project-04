import { useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';
import { selectDate } from '../../redux/water/calendar/selectors';
import css from './ChooseDate.module.css';

function ChooseDate() {
  const currentDate = useSelector(selectDate);

  const formattedDate = new Date(currentDate);

  return (
    <h3 className={css.dateTitle}>
      {isSameDay(formattedDate, new Date())
        ? 'Today'
        : format(formattedDate, 'd, MMMM')}
    </h3>
  );
}

export default ChooseDate;


