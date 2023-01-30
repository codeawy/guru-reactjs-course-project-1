import CloseIcon from "../../components/svg/CloseIcon";

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
    <div className="mb-4 flex flex-col relative">
      <label htmlFor={id} className="mb-[1px] font-medium text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        className=" outline-0 border-[1px] border-gray-400 rounded-md pl-3 py-3 text-md"
        value={value}
        onChange={onChange}
      />
      {value ? (
        <span className="absolute top-[45%] right-2 cursor-pointer" onClick={onClear}>
          <CloseIcon />
        </span>
      ) : null}
    </div>
  );
};

export default FormInput;
