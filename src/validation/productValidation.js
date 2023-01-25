export const productDataValidation = values => {
  const errors = {};
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(values.image);

  if (!values.title.trim() || values.title.length < 10 || values.title.length > 30) {
    errors.title = "Product title must be between 10 and 30 characters!";
  }

  if (
    !values.description.trim() ||
    values.description.length < 10 ||
    values.description.length > 30
  ) {
    errors.description = "Product description must be between 10 and 150 characters!";
  }

  if (!values.image.trim() || !validUrl) {
    errors.image = "Image URL is required";
  }

  if (!values.price.trim()) {
    errors.price = "Price is required!";
  } else if (isNaN(values.price)) {
    errors.brand = "Price is required!";
  }

  if (!values.brand.trim()) {
    errors.brand = "Brand name is required";
  }

  return errors;
};
