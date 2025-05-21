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
    </>
  );
};

export default Card;
