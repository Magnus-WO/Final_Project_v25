import { useState } from "react";

const useSignUpValidation = () => {
  const [signUpErrors, setSignUpErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validateSignUp = (values) => {
    let newErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    }
    if (!values.lastName.trim()) {
      newErrors.lastName = "Please enter your last name";
    }
    if (!values.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Please enter your date of birth";
    }
    if (!values.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!values.password.trim()) {
      newErrors.password = "Please enter a password";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password must include an uppercase, lowercase, number and a special character";
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setSignUpErrors(newErrors);
    return Object.keys.length === 0;
  };

  return { validateSignUp, signUpErrors };
};

export default useSignUpValidation;
