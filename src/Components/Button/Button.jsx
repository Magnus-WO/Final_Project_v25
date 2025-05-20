import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, className, value }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
