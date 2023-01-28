import ColorCircle from "./ColorCircle";
import CloseIcon from "./svg/CloseIcon";
import EyeIcon from "./svg/EyeIcon";

const ProductCard = ({
  id,
  title,
  image,
  description,
  price,
  brand,
  colors,
  productList = [],
  setProductList,
}) => {
  const renderColors = colors.map(color => <ColorCircle key={color} bg={color} />);

  const filterById = () => {
    const filteredArr = productList.filter(item => item.id !== id);
    setProductList(filteredArr);
  };

  return (
    <div className="border-[1px] border-gray-300 rounded-lg flex flex-col justify-content h-fit overflow-hidden relative p-2">
      <div className="rounded-lg overflow-hidden">
        <img src={image} alt="img" className="h-52 w-full lg:object-cover" />
      </div>
      <div className="p-2 text-sm mt-3">
        <h3 className="text-lg uppercase">{title}</h3>
        <p className="text-xs text-gray-500 my-2 break-words webkit">{description}</p>
        <p className="flex items-center mb-3">
          <del className="text-red-600 mr-5">${price}</del>
          <span className="py-2 px-4 rounded-md text-white bg-primary">${+price / 4}</span>
        </p>
        {!colors.length ? (
          <span>Not available colors!</span>
        ) : (
          <ul className="flex items-center mb-3">{renderColors}</ul>
        )}

        <p className="mt-6 text-xs">
          Brand: <span className="text-primary">{brand}</span>
        </p>
        <span className="absolute top-5 right-5 cursor-pointer" onClick={filterById}>
          <CloseIcon />
        </span>
        <span className="absolute top-12 right-5 cursor-pointer" onClick={() => {}}>
          <EyeIcon />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
