import { useSelector } from "react-redux"
import styles from "./DailyNorma.module.css"
import { selectUserWaterToDrink } from "../../redux/user/selectors.js"

export default function DailyNorma() {
  const water = useSelector(selectUserWaterToDrink)
  return (
    <div className={styles.container}>
      <p className={styles.water}>{water}&nbsp;L</p>
      <p className={styles.text}>My daily norma</p>
    </div>
  )
}
