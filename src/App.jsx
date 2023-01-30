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
import BuildProductModal from "./shared/Modal/BuildProductModal";

const App = () => {
  /* ------- STATE -------  */
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
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

  const closeBuildProductModal = () => {
    setIsBuildModalOpen(false);
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
      <HeroSection onClickHandler={() => setIsBuildModalOpen(true)} />
      <div className="container">
        <div className="grid grid-cols-products-grid gap-3">{renderProductList}</div>

        <BuildProductModal
          modalIsOpen={isBuildModalOpen}
          closeModal={closeBuildProductModal}
          product={product}
          tempColors={tempColors}
          setTempColors={setTempColors}
          errors={errors}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isError={isError}
          changeHandler={changeHandler}
          onSubmitHandler={onSubmitHandler}
        />
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
