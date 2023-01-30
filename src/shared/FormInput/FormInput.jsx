const FormInput = ({
  label = "",
  id = "",
  type = "text",
  name = "",
  value = "",
  isDisabled = false,
  isRequired = false,
  onChange = () => {},
  onClear,
}) => {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="mb-[1px] text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
