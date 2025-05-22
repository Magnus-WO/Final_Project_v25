import { useState } from "react";

const useContactFormValidation = () => {
  const [contactErrors, setContactErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateContactForm = (values) => {
    let newErrors = {};

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!values.topic.trim()) {
      newErrors.topic = "Please enter a topic";
    }
    if (!values.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMessageLength = (value, maxLength) => {
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      message:
        value.trim().length >= maxLength
          ? `Maximum characters allowed is ${maxLength}`
          : "",
    }));
  };
  return { contactErrors, validateContactForm, validateMessageLength };
};

export default useContactFormValidation;
