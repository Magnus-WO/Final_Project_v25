import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, className, value, type, ariaLabel }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      value={value}
      type={type}
      ariaLabel={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
