const FormSubmitBtn = ({ value = "add product", isError = false }) => {
  const errClass = isError
    ? "bg-red-700 hover:bg-red-600"
    : "duration-300 bg-gradient-to-r from-purple-500 via-[#A31ACB] to-pink-500 hover:from-pink-500 hover:to-[#6C4AB6]";

  return (
    <input
      type="submit"
      value={value}
      className={`${errClass} rounded-md duration-300 w-full p-6 uppercase text-white cursor-pointer font-medium`}
    />
  );
};

export default FormSubmitBtn;
