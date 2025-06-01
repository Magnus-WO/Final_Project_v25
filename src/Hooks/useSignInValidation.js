import { useState } from "react";

const useSignInValidation = () => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateSignIn = (values) => {
    let newErrors = {};

    if (!values.logInEmail.trim()) {
      newErrors.logInEmail = "Please enter your email";
    } else if (!emailRegex.test(values.logInEmail)) {
      newErrors.logInEmailemail = "Please enter a valid email";
    }

    if (!values.logInPassword.trim()) {
      newErrors.logInPassword = "Please enter your password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { validateSignIn, errors, setErrors };
};

export default useSignInValidation;
