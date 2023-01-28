import ColorCircle from "./ColorCircle";

const ProductCard = ({ id, title, image, description, price, brand, colors }) => {
  console.log(colors);
  const renderColors = colors.map(color => <ColorCircle key={color} bg={color} />);

  return (
    <div className="border-[1px] border-gray-300 rounded-lg flex flex-col justify-content h-fit overflow-hidden relative p-2">
      <div className="rounded-lg overflow-hidden">
        <img src={image} alt="img" className="h-52 w-full lg:object-cover" />
      </div>
      <div className="p-2 text-sm mt-3">
        <h3 className="text-lg uppercase">{title}</h3>
        <p className="text-xs text-gray-500 my-2 break-words">{description}</p>
        <p className="flex items-center mb-3">
          <del className="text-red-600 mr-5">${price}</del>
          <span className="bg-primary py-2 px-4 rounded-md text-white">${price}</span>
        </p>
        <ul className="flex items-center mb-3">{renderColors}</ul>

        <p className="mt-6 text-xs">
          Brand: <span className="text-primary">{brand}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
