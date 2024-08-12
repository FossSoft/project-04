import css from './CalendarTitle.module.css';

const CalendarTitle = ({ onTodayHandler, title }) => {
  const handleClick = () => {
    if (title === 'Month') {
      onTodayHandler(); // Переход на текущую дату
    }
  };

  return (
    <div className={css.textWrapper} onClick={handleClick}>
      {title}
    </div>
  );
};

export default CalendarTitle;
