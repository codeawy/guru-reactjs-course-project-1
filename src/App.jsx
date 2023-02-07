import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ------- SCHEMA -------  */
import { productDataValidation } from "./validation/productValidation";

/* ------- MOCK -------  */
import { PRODUCTS } from "./lists/products";

/* ------- COMPONENT -------  */
import ProductCard from "./components/ProductCard";
import Modal from "./shared/Modal/Modal";
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
  const [selectedCategory, setSelectedCategory] = useState(categories[6]);

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

  const openBuildProductModal = () => {
    setIsBuildModalOpen(true);
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
    setProduct({
      title: "",
      description: "",
      image: "",
      price: "",
      brand: "",
      colors: [],
    });

    setTempColors([]);
    setIsError(false);
    setIsBuildModalOpen(false);
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
  const renderProductList = productList.map((product, idx) => (
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

  return (
    <>
      <ToastContainer />
      <HeroSection onClickHandler={openBuildProductModal} />
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Latest <span className="text-indigo-600">Products</span>
          </h2>
          <div
            className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer w-fit"
            onClick={openBuildProductModal}
          >
            Build now
          </div>
        </div>
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
