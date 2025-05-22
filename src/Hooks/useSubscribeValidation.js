import { useState } from "react";

const useSubscribeValidation = () => {
  const [subscribeError, setSubscribeError] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = (values) => {
    let newError = {};

    if (!values.email.trim()) {
      newError.email = "Please enter your email";
    } else if (!emailRegex.test(values.email)) {
      newError.email = "Please enter a valid email";
    }

    setSubscribeError(newError);
    return Object.keys(newError).length === 0;
  };

  return { subscribeError, setSubscribeError, validateInput };
};

export default useSubscribeValidation;
