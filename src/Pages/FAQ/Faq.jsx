import styles from "./Faq.module.css";
import Card from "../../Components/Card/Card";
import Button from "../../Components/Button/Button";
import faq from "../../JS/faq";

import useContactFormValidation from "../../Hooks/useContactFormValidation";
import { useState } from "react";
import { database } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Faq = () => {
  const [contactFormData, setContactFormData] = useState({
    email: "",
    topic: "",
    message: "",
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const { contactErrors, validateContactForm, validateMessageLength } =
    useContactFormValidation();
  const [formValidationMessage, setFormValidationMessage] = useState("");

  // Showing contact modal
  const handleShowContactModal = () => {
    if (showContactModal) {
      setShowContactModal(false);
      setFormValidationMessage("");
      setContactFormData({
        email: "",
        topic: "",
        message: "",
      });
    } else {
      setShowContactModal(true);
    }
  };

  // Fetching form data
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "message") {
      validateMessageLength(value, 300);
    }
  };

  // Handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm(contactFormData)) {
      setFormValidationMessage("Message has not been sendt");
      setInterval(() => {
        setFormValidationMessage("");
      }, 3000);
      return;
    }
    console.log("testing");

    try {
      const docRef = await addDoc(collection(database, "contact-messages"), {
        ...contactFormData,
        submittedAt: serverTimestamp(),
      });
      console.log(`document added with id ${docRef.id}`);
      setContactFormData({
        email: "",
        topic: "",
        message: "",
      });
      setFormValidationMessage("Message sendt!");
      setInterval(() => {
        setFormValidationMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.faq}>
      <div className={styles.headerContainer}>
        <h1>FAQs</h1>
        <p>
          Find answers to your burning questions about Diavola, our music, and
          upcoming shows
        </p>
        <Button
          className={styles.contactButton}
          onClick={handleShowContactModal}
        >
          CONTACT
        </Button>
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
      {/*---------------- Modal ---------------- */}
      {showContactModal && (
        <div className={styles.contactFormContainer}>
          <form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            noValidate
          >
            <h1>CONTACT US</h1>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="someone@example.com"
                onChange={handleFormData}
                value={contactFormData.email}
              />
              <p className={styles.errorMessage}>{contactErrors.email}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                name="topic"
                placeholder="booking"
                id="topic"
                onChange={handleFormData}
                value={contactFormData.topic}
              />
              <p className={styles.errorMessage}>{contactErrors.topic}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                className={styles.contactMessage}
                placeholder="Enter your message (max 300 characters)"
                cols="30"
                rows="10"
                onChange={handleFormData}
                value={contactFormData.message}
              ></textarea>
              <p className={styles.errorMessage}>{contactErrors.message}</p>
            </div>
            <p className={styles.formConfirmation}>{formValidationMessage}</p>
            <div className={styles.formButtonsContainer}>
              <Button
                type="button"
                className={`${styles.contactFormButton} ${styles.contactFormButtonClose}`}
                onClick={handleShowContactModal}
              >
                CLOSE
              </Button>
              <Button
                type="submit"
                className={`${styles.contactFormButton} ${styles.contactFormButtonSubmit}`}
              >
                SEND
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Faq;
