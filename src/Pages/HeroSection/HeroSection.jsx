import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = ({}) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1>UNLEASH THE POWER OF NORWEGIAN GROOVE METAL</h1>
        <p>EXPERIENCE OUR LATEST RELEASE AND FEEL THE INTENSITY</p>
      </div>
      <div className={styles.imageContainer}>
        <img
          src="/Assets/Images/diavola-vaterland.jpeg"
          alt="image of Diavola live at Vaterland in Oslo"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default HeroSection;
