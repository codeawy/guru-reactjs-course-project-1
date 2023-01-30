import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ modalIsOpen, closeModal, data }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <h3>{data?.title}</h3>
      </ReactModal>
    </div>
  );
};

export default Modal;
