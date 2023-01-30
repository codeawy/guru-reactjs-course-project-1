import ReactModal from "react-modal";
import ColorCircle from "../../components/ColorCircle";
import COLORS from "../../lists/colors";
import formInputList from "../../lists/formInputs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormInput from "../FormInput/FormInput";
import FormSubmitBtn from "../FormSubmitBtn/FormSubmitBtn";

const customStyles = {
  content: {
    padding: 0,
    border: "none",
    backgroundColor: "teal",
    width: "fit-content",
    margin: "0 auto",
  },
};

ReactModal.setAppElement("#root");

const BuildProductModal = ({
  modalIsOpen,
  closeModal,
  product,
  setProduct,
  errors,
  tempColors,
  setTempColors,
  isError,
  changeHandler,
  onSubmitHandler,
}) => {
  /* ------- RENDER -------  */

  const renderFormInputList = formInputList.map(({ name, label, type }, idx) => (
    <div key={idx}>
      <FormInput
        label={label}
        name={name}
        type={type}
        id={label}
        value={product[name]}
        onChange={changeHandler}
        onClear={() => setProduct({ ...product, [name]: "" })}
      />
      <ErrorMessage msg={errors[name]} />
    </div>
  ));

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="w-full mx-auto" onSubmit={onSubmitHandler}>
          {renderFormInputList}
          <p>COLORS: ({tempColors.length})</p>
          <p>
            Selected Colors: {!tempColors.length ? "__" : ""}
            {tempColors.map((color, idx) => (
              <span key={color}>
                {color}
                {idx + 1 === tempColors.length ? "" : ", "}
              </span>
            ))}
          </p>
          <div className="flex items-center my-3">
            {COLORS.map((color, idx) => (
              <ColorCircle
                key={idx}
                bg={color}
                onClick={() => {
                  if (tempColors.includes(color)) {
                    setTempColors(prevState => prevState.filter(item => item !== color));
                    return;
                  }
                  setTempColors(prev => [...prev, color]);
                }}
              />
            ))}
          </div>
          <FormSubmitBtn isError={isError} />
        </form>
      </ReactModal>
    </div>
  );
};

export default BuildProductModal;
