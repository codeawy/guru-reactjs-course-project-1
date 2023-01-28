import { useState } from "react";
import { nanoid } from "nanoid";

/* ------- SCHEMA -------  */
import { productDataValidation } from "./validation/productValidation";

/* ------- MOCK -------  */
import formInputList from "./lists/formInputs";

/* ------- COMPONENT -------  */
import ProductCard from "./components/ProductCard";
import FormInput from "./shared/FormInput/FormInput";
import FormSubmitBtn from "./shared/FormSubmitBtn/FormSubmitBtn";
import ErrorMessage from "./shared/ErrorMessage/ErrorMessage";
import ColorCircle from "./components/ColorCircle";
import COLORS from "./lists/colors";

const App = () => {
  /* ------- STATE -------  */
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: "",
    colors: [],
    // sizes: [],
  });

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

  const onSubmitHandler = e => {
    e.preventDefault();

    setErrors(productDataValidation(product));
    if (Object.keys(productDataValidation(product)).length) {
      setIsError(true);
      return;
    }

    setProductList([...productList, { ...product, id: nanoid() }]);
    // setPost({
    //   title: "",
    //   description: "",
    //   image: "",
    //   price: "",
    //   brand: "",
    //   colors: [],
    // });

    setIsError(false);
  };

  /* ------- RENDER -------  */
  const renderPostList = productList.map(post => (
    <ProductCard key={post.id} {...post} postList={productList} setPostList={setProductList} />
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
    <div className="container mx-auto">
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
          {renderPostList}
        </div>

        <form className="w-full lg:w-1/4" onSubmit={onSubmitHandler}>
          {renderFormInputList}
          <p>COLORS: (0)</p>
          <p>Selected Colors: __</p>
          <div className="flex items-center my-3">
            {COLORS.map((color, idx) => (
              <ColorCircle
                key={idx}
                bg={color}
                onClick={() => {
                  console.log(color);
                }}
              />
            ))}
          </div>
          <FormSubmitBtn isError={isError} />
        </form>
      </div>
    </div>
  );
};

export default App;
