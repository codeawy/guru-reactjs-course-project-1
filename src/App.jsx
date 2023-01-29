import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ------- SCHEMA -------  */
import { productDataValidation } from "./validation/productValidation";

/* ------- MOCK -------  */
import COLORS from "./lists/colors";
import { PRODUCTS } from "./lists/products";
import formInputList from "./lists/formInputs";

/* ------- COMPONENT -------  */
import ProductCard from "./components/ProductCard";
import FormInput from "./shared/FormInput/FormInput";
import FormSubmitBtn from "./shared/FormSubmitBtn/FormSubmitBtn";
import ErrorMessage from "./shared/ErrorMessage/ErrorMessage";
import ColorCircle from "./components/ColorCircle";
import Modal from "./shared/Modal/Modal";
import SelectMenu from "./shared/SelectMenu/SelectMenu";
import HeroSection from "./components/HeroSection";
import { categories } from "./lists/categories";

const App = () => {
  /* ------- STATE -------  */
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productList, setProductList] = useState(PRODUCTS);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    colors: [],
    category: {},
    // sizes: [],
  });
  const [tempColors, setTempColors] = useState([]);
  const [temProductIdx, setTemProductIdx] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  console.log(selectedCategory);

  const [errors, setErrors] = useState({ ...product });
  const [isError, setIsError] = useState(false);

  /* ------- HANDLER -------  */
  const changeHandler = e => {
    const {
      target: { value, name },
    } = e;

    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTemProductIdx(null);
  };

  const onDestroyProduct = id => {
    const filteredArr = productList.filter(item => item.id !== id);
    setProductList(filteredArr);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    setErrors(productDataValidation(product));
    if (Object.keys(productDataValidation(product)).length) {
      setIsError(true);
      return;
    }

    setProductList([
      { ...product, id: nanoid(), colors: tempColors, category: selectedCategory },
      ...productList,
    ]);
    // setPost({
    //   title: "",
    //   description: "",
    //   image: "",
    //   price: "",
    //   brand: "",
    //   colors: [],
    // });

    setTempColors([]);
    setIsError(false);
    toast.success("Product has been added successfully", {
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

  /* ------- RENDER -------  */
  const renderProductList = productList
    .reverse()
    .map((product, idx) => (
      <ProductCard
        key={product.id}
        {...product}
        productList={productList}
        setProductList={setProductList}
        openModal={openModal}
        idx={idx}
        setTemProductIdx={setTemProductIdx}
      />
    ));

  console.log(productList);

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
    <>
      <ToastContainer />
      <HeroSection />
      <div className="container">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
            {renderProductList}
          </div>

          <form className="w-full lg:w-1/4" onSubmit={onSubmitHandler}>
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
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <FormSubmitBtn isError={isError} />
          </form>
        </div>

        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          data={productList[temProductIdx]}
          onClickAction={onDestroyProduct}
        />
      </div>
    </>
  );
};

export default App;
