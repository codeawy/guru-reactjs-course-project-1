import { Fragment, useState } from "react";
import formInputs from "./lists/formInputs";
import ErrorMessage from "./shared/ErrorMessage/ErrorMessage";
import FormInput from "./shared/FormInput/FormInput";
import FormSubmitBtn from "./shared/FormSubmitBtn/FormSubmitBtn";

/** ---------- COMPONENT ---------- */

const App = () => {
  /** ---------- STATE ---------- */
  const [product, setUser] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: "",
    colors: [],
    // sizes: [], // TODO
  });

  /** ---------- HANDLER ---------- */
  const onChangeHandler = e => {
    const {
      target: { name, value },
    } = e;

    setUser({
      ...product,
      [name]: value,
    });
  };

  /** ---------- RENDER ---------- */
  const renderFormInputList = formInputs.map((input, idx) => (
    <Fragment key={idx}>
      <FormInput
        labelTxt={input.label}
        id={input.name}
        type={input.type}
        name={input.name}
        value={product[name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage />
    </Fragment>
  ));

  return (
    <div>
      <form className="m-6">
        {renderFormInputList}
        <FormSubmitBtn />
      </form>
    </div>
  );
};

export default App;
