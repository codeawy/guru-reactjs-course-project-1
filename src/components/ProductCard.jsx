import { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { numberWithCommas } from "../utils/functions";
import ColorCircle from "./ColorCircle";
import CloseIcon from "./svg/CloseIcon";
import EyeIcon from "./svg/EyeIcon";

const ProductCard = ({
  idx,
  setTemProductIdx,
  id,
  title,
  image,
  description,
  price,
  brand,
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
  };

  return (
    <div className="border-[1px] border-gray-300 rounded-lg flex flex-col justify-content h-fit overflow-hidden relative p-2">
      <div className="rounded-lg overflow-hidden">
        <img src={image} alt="img" className="h-52 w-full lg:object-cover" />
      </div>
      <div className="p-2 text-sm mt-3">
        <h3 className="text-lg uppercase">{title}</h3>
        <p className="py-2 rounded-md font-bold text-lg text-indigo-600">
          {numberWithCommas(price)}
        </p>
        {!colors.length ? (
          <span>Not available colors!</span>
        ) : (
          <ul className="flex items-center mb-3">{renderColors}</ul>
        )}

        <div className="flex items-center mb-3">
          <img src={category?.avatar} className="w-10 h-10 rounded-full" />
          <p className="ml-3 text-sm font-medium text-gray-700">{category?.name}</p>
        </div>
        <span className="absolute top-5 right-5 cursor-pointer" onClick={filterById}>
          <CloseIcon />
        </span>
        <span
          className="absolute top-12 right-5 cursor-pointer"
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
