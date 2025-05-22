import React from "react";
import styles from "./HeroSection.module.css";
import Album from "../../Pages/Album/Album";

const HeroSection = ({}) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1>UNLEASH THE POWER OF </h1>
        <h1>NORWEGIAN GROOVE METAL</h1>
        <p>EXPERIENCE OUR LATEST RELEASE AND FEEL THE INTENSITY</p>
      </div>
      <div className={styles.imageContainer}>
        <img
          src="/Assets/Images/diavola-vaterland.jpeg"
          alt="image of Diavola live at Vaterland in Oslo"
          className={styles.heroImage}
        />
      </div>
      <Album></Album>
    </section>
  );
};

export default HeroSection;
