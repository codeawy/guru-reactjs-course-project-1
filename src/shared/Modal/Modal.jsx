import ReactModal from "react-modal";
import { toast } from "react-toastify";
import ColorCircle from "../../components/ColorCircle";
import { numberWithCommas } from "../../utils/func";

const customStyles = {
  content: {
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ modalIsOpen, closeModal, data, onClickAction }) => {
  const renderColors = data?.colors.map(color => <ColorCircle key={color} bg={color} />);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                      {data?.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{data?.description}</p>
                    </div>

                    <img
                      src={data?.image}
                      alt={data?.title}
                      className="rounded-xl block max-w-full max-h-96 mx-auto p-3 object-contain mt-4"
                    />
                    <p className="py-2 mt-4 rounded-md font-bold text-lg text-indigo-600">
                      ${numberWithCommas(data?.price)}
                    </p>
                    {!data?.colors.length ? (
                      <p className="mt-4">Not available colors!</p>
                    ) : (
                      <ul className="flex items-center mt-4">{renderColors}</ul>
                    )}

                    <div className="flex items-center my-3">
                      <img src={data?.category?.avatar} className="w-10 h-10 rounded-full" />
                      <p className="ml-3 text-sm font-medium text-gray-700">
                        {data?.category?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    onClickAction(data?.id);
                    closeModal();
                    toast.success("Product has been removed successfully", {
                      position: "bottom-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                >
                  Destroy
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
