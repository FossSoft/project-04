import sprite from '../../../image/sprite/sprite.svg';
import css from './CalendarToggle.module.css';
const CalendarToggle = ({ onToggleHandler }) => {
  return (
    <button
      onClick={onToggleHandler}
      className={css.iconBtn}
      style={{ cursor: 'pointer' }}
    >
      <svg width="20" height="20">
        <use href={`${sprite}#icon-pie-chart-02`} />
      </svg>
    </button>
  );
};

export default CalendarToggle;
