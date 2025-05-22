import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, className, value, type }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      value={value}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
