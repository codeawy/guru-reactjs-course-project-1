import ReactModal from "react-modal";
import ColorCircle from "../../components/ColorCircle";
import { categories } from "../../lists/categories";
import COLORS from "../../lists/colors";
import formInputList from "../../lists/formInputs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormInput from "../FormInput/FormInput";
import FormSubmitBtn from "../FormSubmitBtn/FormSubmitBtn";
import SelectMenu from "../SelectMenu";

const customStyles = {
  content: {
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
};

ReactModal.setAppElement("#root");

const BuildProductModal = ({
  modalIsOpen,
  closeModal,
  product,
  tempColors,
  setTempColors,
  errors,
  isError,
  changeHandler,
  onSubmitHandler,
  selected,
  setSelected,
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
      />
      <ErrorMessage msg={errors[name]} />
    </div>
  ));

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Build Product"
      shouldCloseOnOverlayClick
    >
      <div className="flex p-3 text-center sm:items-center justify-center sm:p-0 w-full lg:w-96">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <form className="w-full" onSubmit={onSubmitHandler}>
                {renderFormInputList}
                <p className="text-sm font-medium text-gray-700">COLORS: ({tempColors.length})</p>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Selected Colors: {!tempColors.length ? "__" : ""}
                </p>
                <p className="flex flex-wrap">
                  {tempColors.map(color => (
                    <span
                      key={color}
                      className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                      style={{ backgroundColor: color }}
                    >
                      {color}
                    </span>
                  ))}
                </p>
                <div className="flex items-center flex-wrap my-3">
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

                <SelectMenu
                  list={categories}
                  txt="Categories"
                  selected={selected}
                  setSelected={setSelected}
                />
                <FormSubmitBtn isError={isError} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default BuildProductModal;
