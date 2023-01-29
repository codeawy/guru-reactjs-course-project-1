const ColorCircle = ({ bg, onClick }) => {
  return (
    <span
      className={`w-5 h-5 rounded-full mr-1 cursor-pointer`}
      style={{
        backgroundColor: bg,
      }}
      onClick={onClick}
    />
  );
};

export default ColorCircle;
