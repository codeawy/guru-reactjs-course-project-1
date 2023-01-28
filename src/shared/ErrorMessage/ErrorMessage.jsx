const ErrorMessage = ({ msg = "" }) => {
  return <p className="mb-2 text-red-700 font-semibold text-sm">{msg}</p>;
};

export default ErrorMessage;
