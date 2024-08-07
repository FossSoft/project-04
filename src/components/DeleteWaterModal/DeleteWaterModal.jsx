// import css from './DeleteWaterModal.module.css';


// export default function DeleteWaterModal({ item, onDelete, onClose }) {
//   const handleDelete = () => {
//     onDelete(item);
//   };

//   return (
//     <div className={css.modalContainer}>

//       <h2 className={css.title}>Delete entry</h2>
//       <p className={css.textQuestion}>Are you sure you want to delete the entry?</p>

//       <div className={css.buttons}>
//         <button className={css.deleteBtn} type="button" onClick={handleDelete}>
//           Delete
//         </button>

//         <button className={css.cancelBtn} type="button" onClick={onClose}>
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }




import React from 'react';
import css from './DeleteWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { deleteWaterEntry } from '../../redux/water/operations';

export default function DeleteWaterModal({ item, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(item._id)).unwrap();
      onClose(); // Закриваємо модальне вікно після успішного видалення
    } catch (error) {
      console.error('Failed to delete water entry:', error);
      // Можна відобразити повідомлення про помилку користувачу
    }
  };

  return (
    <div className={css.modalContainer}>
      <h2 className={css.title}>Delete entry</h2>
      <p className={css.textQuestion}>Are you sure you want to delete the entry?</p>
      <div className={css.buttons}>
        <button className={css.deleteBtn} type="button" onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
