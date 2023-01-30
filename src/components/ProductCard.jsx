import { toast } from "react-toastify";
import { numberWithCommas } from "../utils/func";
import ColorCircle from "./ColorCircle";
import TrashIcon from "./svg/TrashIcon";
import EyeIcon from "./svg/EyeIcon";

const ProductCard = ({
  idx,
  setTemProductIdx,
  id,
  title,
  image,
  description,
  price,
  colors,
  category,
  productList = [],
  setProductList,
  openModal = () => {},
}) => {
  const renderColors = colors.map(color => <ColorCircle key={color} bg={color} />);

  const filterById = () => {
    const filteredArr = productList.filter(item => item.id !== id);
    setProductList(filteredArr);
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
  };

  return (
    <div className="w-full mx-0 border-[1px] border-gray-300 rounded-lg flex flex-col justify-content h-fit overflow-hidden relative p-2">
      <div className="rounded-lg overflow-hidden">
        <img src={image} alt="img" className="h-52 w-full lg:object-cover" />
      </div>
      <div className="p-2 text-sm mt-3">
        <h3 className="text-lg webkit">{title}</h3>
        <p className="text-xs text-gray-500 my-2 break-words webkit">{description}</p>
        <p className="py-2 rounded-md font-bold text-lg text-indigo-600">
          ${numberWithCommas(price)}
        </p>
        {!colors.length ? (
          <p className="mb-3">Not available colors!</p>
        ) : (
          <ul className="flex items-center mb-3">{renderColors}</ul>
        )}

        <div className="flex items-center mb-3">
          <img src={category?.avatar} className="w-10 h-10 rounded-full" />
          <p className="ml-3 text-sm font-medium text-gray-700">{category?.name}</p>
        </div>

        <span className="absolute top-5 right-[5%] cursor-pointer" onClick={filterById}>
          <TrashIcon />
        </span>
        <span
          className="absolute top-12 right-[5%] cursor-pointer"
          onClick={() => {
            openModal();
            setTemProductIdx(idx);
          }}
        >
          <EyeIcon />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
