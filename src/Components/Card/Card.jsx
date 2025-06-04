import styles from "./Card.module.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getCartContext } from "../../Context/cartContext";
import { getCurrencyContext } from "../../Context/currencyContext";

const Card = ({ member, className, merch, question }) => {
  // Toggling faq answer visibility
  const [isVisible, setIsVisible] = useState(false);
  const [conversionRate, setConversionRate] = useState("");

  const handleAnswerVisibility = () => {
    if (!isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Getting selected size
  const [selectedSize, setSelectedSize] = useState("small");
  // Add merch to cart
  const { dispatch } = getCartContext();
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...merch, selectedSize: selectedSize },
    });
  };

  // Getting conversion from currency Context
  const { currencyConversionRate, chosenCurrency } = getCurrencyContext();
  return (
    <>
      {member && (
        <div className={className}>
          <div className={styles.imageContainer}>
            {member.img && (
              <img
                src={member.img}
                alt={member.alt}
                className={styles.cardImage}
              />
            )}
          </div>
          <div className={styles.textContainer}>
            {member.name && <h3>{member.name}</h3>}
            {member.text1 && <p>Instrument: {member.text1}</p>}
            {member.text2 && <p>Favorite beer: {member.text2}</p>}
          </div>
        </div>
      )}
      {/* Question card */}
      {question && (
        <li className={className}>
          <div
            className={styles.questionHeader}
            onClick={handleAnswerVisibility}
          >
            <h2 className={styles.question}>{question.question}</h2>
          </div>
          <div
            className={
              isVisible ? styles.answerContainerVisible : styles.answerContainer
            }
          >
            <p className={styles.answer}>{question.answer}</p>
          </div>
        </li>
      )}
      {/* Merch card */}
      {merch && (
        <div className={className}>
          <h2>{merch.name}</h2>
          <img src={merch.image} alt={merch.name} />
          {/* insert currency and price from session storage */}
          <p>
            Price: {(merch.price * currencyConversionRate).toFixed(2)}{" "}
            {chosenCurrency}
          </p>
          {merch.sizes ? (
            <select
              name="size"
              id="size"
              onChange={(e) => {
                setSelectedSize(e.target.value);
              }}
            >
              {merch.sizes.map((size) => {
                return (
                  <option value={size} key={size}>
                    {size}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
          <div className={styles.merchButtons}>
            <Button
              type="button"
              ariaLabel="add to cart"
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
