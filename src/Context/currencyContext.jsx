import { createContext, useContext, useState } from "react";

const currencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyConversionRate, setCurrencyConversionRate] = useState("1");
  const [chosenCurrency, setChosenCurrency] = useState("NOK");

  return (
    <currencyContext.Provider
      value={{
        currencyConversionRate,
        setCurrencyConversionRate,
        chosenCurrency,
        setChosenCurrency,
      }}
    >
      {children}
    </currencyContext.Provider>
  );
};

export const getCurrencyContext = () => useContext(currencyContext);
