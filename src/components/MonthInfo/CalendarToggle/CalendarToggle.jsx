import css from './CalendarToggle.module.css';

const CalendarToggle = ({ isActive, setIsActive }) => {
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <button className={isActive ? css.active : ''} onClick={toggleClass}>
      <svg
        className={css.pieChart}
        viewBox="0 0 32 32"
        aria-label="pie-chart"
        id="icon-pie-chart-02"
      >
        <path
          fill="none"
          stroke="#323f47"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeMiterlimit="4"
          strokeWidth="2.6667"
          d="M22.933 18.667c0.369 0 0.554 0 0.704 0.082 0.123 0.068 0.238 0.195 0.293 0.324 0.067 0.157 0.050 0.324 0.016 0.659-0.174 1.733-0.77 3.404-1.744 4.861-1.172 1.754-2.838 3.121-4.787 3.929s-4.094 1.019-6.163 0.607c-2.069-0.412-3.97-1.428-5.462-2.919s-2.508-3.392-2.919-5.461c-0.412-2.069-0.2-4.214 0.607-6.163s2.175-3.615 3.929-4.787c1.457-0.974 3.128-1.57 4.861-1.744 0.334-0.034 0.502-0.050 0.659 0.016 0.13 0.055 0.257 0.17 0.324 0.293 0.082 0.15 0.082 0.334 0.082 0.704v8.533c0 0.373 0 0.56 0.073 0.703 0.064 0.125 0.166 0.227 0.291 0.291 0.143 0.073 0.329 0.073 0.703 0.073h8.533z"
        ></path>
        <path
          fill="none"
          stroke="#9be1a0"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeMiterlimit="4"
          strokeWidth="2.6667"
          d="M18.667 3.733c0-0.369 0-0.554 0.082-0.704 0.068-0.123 0.195-0.238 0.324-0.293 0.157-0.067 0.324-0.050 0.659-0.016 2.438 0.245 4.73 1.323 6.478 3.071s2.826 4.040 3.071 6.478c0.033 0.334 0.050 0.502-0.016 0.659-0.055 0.13-0.17 0.257-0.293 0.324-0.15 0.082-0.334 0.082-0.704 0.082h-8.533c-0.373 0-0.56 0-0.703-0.073-0.125-0.064-0.227-0.166-0.291-0.291-0.073-0.143-0.073-0.329-0.073-0.703v-8.533z"
        ></path>
      </svg>
    </button>
  );
};

export default CalendarToggle;
