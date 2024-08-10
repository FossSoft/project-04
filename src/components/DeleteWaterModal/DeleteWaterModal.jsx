import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterEntry } from '../../redux/water/operations';
import { selectAccessToken } from '../../redux/auth/selectors';
import css from './DeleteWaterModal.module.css';

export default function DeleteWaterModal({ item, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);

  const handleDelete = async () => {
    if (!item || !item.id) {
      // console.error('Item is not defined or does not have an id');
      return;
    }

    try {
      await dispatch(deleteWaterEntry({ id: item.id, token })).unwrap();
      onClose();
    } catch (error) {
      // console.error('Failed to delete water entry:', error);
      alert('Failed to delete water entry: ' + error.message);
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
