import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/slice';
import Modal from 'components/Modal/Modal';
import css from './AddWaterBtn.module.css';
import sprite from '../../image/sprite/sprite.svg';
// import WaterModal from '';

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddWater = (waterItem) => {
    console.log('Dispatching water item:', waterItem);
    dispatch(addWater(waterItem));
    handleCloseModal();
  };

  return (
    <>
      <button className={css.btnAddWater} type='button' onClick={handleOpenModal}>
        <svg className={css.svgPlus}>
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
        <span>Add water</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      >
        Тут буде WaterModal
        {/* <WaterModal onSubmit={handleAddWater} onCancel={handleCloseModal} /> */}
      </Modal>
    </>
  );
};

export default AddWaterBtn;

