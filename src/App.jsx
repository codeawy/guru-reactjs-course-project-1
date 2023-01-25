import { Fragment, useState } from "react";
import { nanoid } from "nanoid";
import formInputs from "./lists/formInputs";
import ErrorMessage from "./shared/ErrorMessage/ErrorMessage";
import FormInput from "./shared/FormInput/FormInput";
import FormSubmitBtn from "./shared/FormSubmitBtn/FormSubmitBtn";
import { productDataValidation } from "./validation/productValidation";

/** ---------- COMPONENT ---------- */

const App = () => {
  /** ---------- STATE ---------- */
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: "",
    colors: [],
    // sizes: [], // TODO
    // gender: "male"
  });
  const [errors, setErrors] = useState({ ...product });
  const [isError, setIsError] = useState(false);

  /** ---------- HANDLER ---------- */
  const onChangeHandler = e => {
    const {
      target: { name, value },
    } = e;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const submitHandler = e => {
    e.preventDefault();

    setErrors(productDataValidation(product));

    if (Object.keys(productDataValidation(product)).length) {
      setIsError(true);
      return;
    }

    setProductList([...productList, { ...product, id: nanoid() }]);
  };

  /** ---------- RENDER ---------- */
  const renderFormInputList = formInputs.map(({ label, name, type }, idx) => (
    <Fragment key={idx}>
      <FormInput
        labelTxt={label}
        id={name}
        type={type}
        name={name}
        value={product[name]}
        onChange={onChangeHandler}
      />

      <ErrorMessage msg={errors[name]} />
    </Fragment>
  ));

  return (
    <div>
      <form className="m-6" onSubmit={submitHandler}>
        {renderFormInputList}
        <FormSubmitBtn isError={isError} />
      </form>

      {productList.map(({ id, title }) => (
        <h2 key={id}>{title}</h2>
      ))}
    </div>
  );
};

export default App;
