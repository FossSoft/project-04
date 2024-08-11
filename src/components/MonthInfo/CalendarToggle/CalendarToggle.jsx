import sprite from '../../../image/sprite/sprite.svg';
import css from './CalendarToggle.module.css';
const CalendarToggle = ({ isActive, setIsActive }) => {
  const toggleClass = () => {
    setIsActive(!isActive);
  };
  return (
    <button className={isActive ? css.active : ''} onClick={toggleClass}>
      <svg width="24" height="24">
        <use href={`${sprite}#icon-pie-chart-02`} />
      </svg>
    </button>
  );
};

export default CalendarToggle;
