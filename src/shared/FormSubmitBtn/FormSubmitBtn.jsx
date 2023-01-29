const FormSubmitBtn = ({ value = "add product", isError = false }) => {
  const errClass = isError
    ? "bg-red-700 hover:bg-red-600"
    : "duration-300 bg-indigo-600 hover:bg-indigo-700";

  return (
    <input
      type="submit"
      value={value}
      className={`${errClass} rounded-md duration-300 w-full p-6 uppercase text-white cursor-pointer font-medium`}
    />
  );
};

export default FormSubmitBtn;
