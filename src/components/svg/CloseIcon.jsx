function CloseIcon({ width = 25, height = 25, fill = "red" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ borderRadius: "50%" }}
    >
      <g fill={fill} fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path fillRule="nonzero" d="M0 0H24V24H0z"></path>
          <path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M17 7L7 17"></path>
          <path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M7 7L17 17"></path>
        </g>
      </g>
    </svg>
  );
}

export default CloseIcon;
