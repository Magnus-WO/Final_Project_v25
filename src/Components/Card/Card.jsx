import styles from "./Card.module.css";
import Button from "../Button/Button";
import { useState } from "react";

const Card = ({ member, className, merch, question }) => {
  // Toggling faq answer visibility
  const [isVisible, setIsVisible] = useState(false);
  const handleAnswerVisibility = () => {
    if (!isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

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
          <p>Price: {merch.price} NOK</p>
          {merch.sizes ? (
            <select name="size" id="size">
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
