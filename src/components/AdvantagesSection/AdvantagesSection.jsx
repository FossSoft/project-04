import Customers from 'components/Customers/Customers';
import css from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  return (
    <section className={css.advantages_section}>
      <Customers />
      <div className={css.background_image}></div>
      <ul className={css.advantages_list}>
        <li className={css.habbit}>
          <span className={css.elipse}></span> Habit drive
        </li>
        <li className={css.statistics}>View statistics</li>
        <li className={css.rate}>Personal rate setting</li>
      </ul>
    </section>
  );
}
