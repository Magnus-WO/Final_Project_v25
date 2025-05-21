import styles from "./Faq.module.css";
import Card from "../../Components/Card/Card";
import Button from "../../Components/Button/Button";
import faq from "../../JS/faq";
import { useState } from "react";

const Faq = () => {
  return (
    <section className={styles.faq}>
      <div className={styles.headerContainer}>
        <h1>FAQs</h1>
        <p>
          Find answers to your burning questions about Diavola, our music, and
          upcoming shows
        </p>
        <Button className={styles.contactButton}>CONTACT</Button>
      </div>
      <div className={styles.cardsContainer}>
        <ul className={styles.faqList}>
          {faq.map((question) => {
            return (
              <Card
                question={question}
                className={styles.questionCard}
                key={question.question}
              />
            );
          })}
        </ul>
      </div>
      <div className={styles.contactFormContainer}></div>
    </section>
  );
};

export default Faq;
