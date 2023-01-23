export const productDataValidation = values => {
  const errors = {};

  if (!values.price.trim()) {
    errors.price = "Price is required!";
  } else if (isNaN(values.price)) {
    errors.brand = "Price is required!";
  }

  if (values.brand.trim()) {
    errors.price = "Brand name is required";
  }

  return errors;
};
