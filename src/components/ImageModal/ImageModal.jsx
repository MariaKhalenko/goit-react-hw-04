import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onCloseModal }) => {
  const imageSrc = image && image.imageSrc;

  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modalWindow}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      {imageSrc && (
        <img
          className={css.imageModal}
          src={imageSrc}
          alt={image && image.alt_description}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
