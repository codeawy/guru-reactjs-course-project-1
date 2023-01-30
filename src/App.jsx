import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ------- SCHEMA -------  */
import { productDataValidation } from "./validation/productValidation";

/* ------- MOCK -------  */
import { PRODUCTS } from "./lists/products";

/* ------- COMPONENT -------  */
import ProductCard from "./components/ProductCard";
import Modal from "./shared/Modal/Modal";
import HeroSection from "./components/HeroSection";
import BuildProductModal from "./shared/Modal/BuildProductModal";
import { categories } from "./lists/categories";

const App = () => {
  /* ------- STATE -------  */
  const [buildModalIsOpen, setBuildModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productList, setProductList] = useState(PRODUCTS);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    colors: [],
    category: {},
  });
  const [selected, setSelected] = useState(categories[0]);

  const [tempColors, setTempColors] = useState([]);
  const [temProductIdx, setTemProductIdx] = useState(null);

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

  // ** Product details modal
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
    setTemProductIdx(null);
  }

  // ** Build a product details modal
  function openModal() {
    setBuildModalIsOpen(true);
  }
  function closeBuildModal() {
    setBuildModalIsOpen(false);
    // setTemProductIdx(null);
  }

  const onSubmitHandler = e => {
    e.preventDefault();

    setErrors(productDataValidation(product));

    if (Object.keys(productDataValidation(product)).length) {
      setIsError(true);
      return;
    }

    setProductList([...productList, { ...product, id: nanoid(), colors: tempColors }]);
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
  };

  /* ------- RENDER -------  */
  const renderPostList = productList.map((product, idx) => (
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
      <HeroSection buildHandler={openModal} />

      <div className="container mx-auto">
        <div className="grid grid-cols-products-grid gap-3 ">{renderPostList}</div>
        <BuildProductModal
          modalIsOpen={buildModalIsOpen}
          closeModal={closeBuildModal}
          product={product}
          setProduct={setProduct}
          tempColors={tempColors}
          setTempColors={setTempColors}
          errors={errors}
          isError={isError}
          changeHandler={changeHandler}
          onSubmitHandler={onSubmitHandler}
          selected={selected}
          setSelected={setSelected}
        />
        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          data={productList[temProductIdx]}
          productList={productList}
          setProductList={setProductList}
        />
      </div>
    </>
  );
};

export default App;
