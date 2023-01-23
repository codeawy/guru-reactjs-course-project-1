const FormSubmitBtn = ({ value = "add product" }) => {
  return (
    <input
      type="submit"
      value={value}
      className="rounded-md bg-red-700 hover:bg-red-600 duration-300 w-full p-6 uppercase text-white cursor-pointer font-medium"
    />
  );
};

export default FormSubmitBtn;
