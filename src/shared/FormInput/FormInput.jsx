const FormInput = ({
  labelTxt = "",
  id = "",
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
  isDisabled = false,
  isRequired = false,
}) => {
  return (
    <div className="mb-2 flex flex-col">
      <label htmlFor={id} className="mb-[1px] font-medium text-sm">
        {labelTxt}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        className="outline-0 border-[1px] border-gray-400 rounded-md pl-3 py-3 text-md"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
