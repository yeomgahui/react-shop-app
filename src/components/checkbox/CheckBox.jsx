const CheckBox = ({
  disabeld = false,
  checked = false,
  label,
  onChange,
  ...restProps
}) => {
  return (
    <label style={{ fontSize: "1.4rem" }}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        disabled={disabeld}
        onChange={onChange}
        {...restProps}
      />{" "}
    </label>
  );
};

export default CheckBox;
