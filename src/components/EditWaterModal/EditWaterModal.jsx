import { useState } from 'react';
import css from './EditWaterModal.module.css';
import sprite from '../../image/sprite/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/auth/selectors.js';
import { updateWaterAmount } from '../../redux/water/operations.js';
import { updateWater } from '../../redux/water/slice.js';


export const EditWaterModal = ({item, onClose }) => {

  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);
  const id = item.id

  const [quantity, setQuantity] = useState(item.amountOfWater);
  const [time, setTime] = useState(item.time);

  const handleSave = (e) => {
    e.preventDefault();

    const updatedItem = {
      ...item,
      amountOfWater: quantity,
      time: time,
    };
    dispatch(updateWater(updatedItem));

    dispatch(updateWaterAmount([id, updatedItem, token]));

    onClose(); 
  };

    
    
    const handleDecrease = () => {
    setQuantity(prevValue => (prevValue > 50 ? prevValue - 50 : prevValue));
  };

  const handleIncrease = () => {
    setQuantity(prevValue => (prevValue < 1500 ? prevValue + 50 : prevValue));
    };
    
  const handleChangeAmmount = (e) => {
      
  let value = e.target.value;
  if (isNaN(value) || value.trim() === '') {
    return; 
  }

  value = Number(value);
  if (value < 0) {
    value = 0;
  } else if (value > 1500) {
    value = 1500;
  }

  setQuantity(value);
};
  
  const handleChangeTime = (e) => {
      setTime(e.target.value)
  };



  return (
      <div className={css.editWaterModalContWindow}>
        <div className={css.editWaterModalListAndBtn}>

          <h2 className={css.editWaterTitle}>Edit the entered amount of water</h2>
          <span className={css.editWaterSpan}>Correct entered data:</span>

          <p className={css.amountText}>Amount of water:</p>
          <div className={css.quantityWrapper}>
            <button
              className={css.quantityBtn}
              type="button"
            onClick={handleDecrease}
            disabled={quantity <= 50}
            >
              <svg  className={css.quantityIcon}>
                <use xlinkHref={`${sprite}#icon-minus`}></use>
              </svg>
            </button>
            <div className={css.numberQuantity}>
              <span className={css.quantitySpan}>{quantity} ml</span>
            </div>
            <button
              className={css.quantityBtn}
              type="button"
            onClick={handleIncrease}
            disabled={quantity >= 1500}
            >
              <svg  className={css.quantityIcon}>
                <use xlinkHref={`${sprite}#icon-plus`}></use>
              </svg>
            </button>
          </div>

          <form className={css.editWaterForm} onSubmit={handleSave}>
            <label htmlFor="recordingTime" className={css.labelRecordingTime}>
              Recording time:
              <input
                className={css.editInput}
                type="text"
                id="recordingTime"
              defaultValue={time}
              onChange={handleChangeTime}
              pattern="^([01]\d|2[0-3]):([0-5]\d)$"
              placeholder="00:00"
              required
              />
            </label>
            <label htmlFor="valueOfWater" className={css.labelValueOfWater}>
              Enter the value of the water used:
              <input
                className={css.editInput}
                type="text"
                id="valueOfWater"
              value={quantity}
                onChange={handleChangeAmmount}            
              />
            </label>
            <button type="submit" className={css.btnSave}>
              Save
            </button>
          </form>
        </div>
      </div>
  );
};
