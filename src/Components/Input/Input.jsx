import styles from "./Input.module.css";

const Input = ({ type, name, id, placeholder, onChange, value, className }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={className}
    ></input>
  );
};

export default Input;
