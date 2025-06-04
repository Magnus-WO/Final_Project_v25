import { useState } from "react";

const useCheckoutValidation = () => {
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateCheckoutForm = (values) => {
    let newErrors = {};

    if (!values.paymentEmail.trim()) {
      newErrors.paymentEmail = "Please enter an email";
    } else if (!emailRegex.test(values.paymentEmail)) {
      newErrors.paymentEmail = "Please enter a valid email";
    }

    if (!values.address.trim()) {
      newErrors.address = "Please enter an address";
    }
    if (!values.city.trim()) {
      newErrors.city = "Please enter your city";
    }
    if (!values.zip.trim()) {
      newErrors.zip = "Please enter a zip code";
    }
    setCheckoutErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validateCheckoutForm, checkoutErrors };
};

export default useCheckoutValidation;
