import { useState } from 'react';
import css from './EditWaterModal.module.css';
import sprite from '../../image/sprite/sprite.svg';

export const EditWaterModal = ({ onClose }) => {

    const [quantity, setQuantity] = useState(50);

    const timeNow = new Date().toTimeString().slice(0, 5);
    
    const handleDecrease = () => {
    setQuantity(prevValue => (prevValue > 50 ? prevValue - 50 : prevValue));
  };

  const handleIncrease = () => {
    setQuantity(prevValue => (prevValue < 1500 ? prevValue + 50 : prevValue));
    };
    
    const handleChange = (e) => {
    setQuantity(Number(e.target.value));
    };

     const inputStyle = {
    WebkitAppearance: 'none',
    MozAppearance: 'textfield'
  };

  return (
    <div className={css.mainEditWaterModalCont}>
      <div className={css.editWaterModalContWindow}>
        <div className={css.editWaterModalListAndBtn}>
          <button onClick={onClose} className={css.btnCloseModal}>
            <svg className={css.btnCloseSvg}>
              <use  href={`${sprite}#icon-x`}></use>
            </svg>
          </button>

          <h2 className={css.editWaterTitle}>Edit the entered amount of water</h2>
          <span className={css.editWaterSpan}>Correct entered data:</span>

          <p className={css.amountText}>Amount of water:</p>
          <div className={css.quantityWrapper}>
            <button
              className={css.quantityBtn}
              type="button"
              onClick={handleDecrease}
            >
              <svg width="24" height="24" className={css.quantityIcon}>
                <use xlinkHref={`${sprite}#icon-x`}></use>
              </svg>
            </button>
            <div className={css.numberQuantity}>
              <span className={css.quantitySpan}>{quantity} ml</span>
            </div>
            <button
              className={css.quantityBtn}
              type="button"
              onClick={handleIncrease}
            >
              <svg width="24" height="24" className={css.quantityIcon}>
                <use xlinkHref={`${sprite}#icon-x`}></use>
              </svg>
            </button>
          </div>

          <form className={css.editWaterForm}>
            <label htmlFor="recordingTime" className={css.labelRecordingTime}>
              Recording time:
              <input
                className={css.editInput}
                type="text"
                id="recordingTime"
                defaultValue={timeNow}
              />
            </label>
            <label htmlFor="valueOfWater" className={css.labelValueOfWater}>
              Enter the value of the water used:
              <input
                className={css.editInput}
                type="text"
                id="valueOfWater"
                value={quantity}
                onChange={handleChange}            
              />
            </label>
            <button type="submit" className={css.btnSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
