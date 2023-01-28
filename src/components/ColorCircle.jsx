const ColorCircle = ({ bg, onClick }) => {
  return (
    <span
      className={`w-8 h-8 rounded-full mr-2 cursor-pointer`}
      style={{
        backgroundColor: bg,
      }}
      onClick={onClick}
    />
  );
};

export default ColorCircle;
