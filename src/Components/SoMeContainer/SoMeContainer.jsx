import React from "react";
import styles from "./SoMeContainer.module.css";

const SoMeContainer = ({ className }) => {
  return (
    <div className={`${className} ${styles.someContainer}`}>
      <a href="https://www.instagram.com/diavola.official/" target="_blank">
        <img
          src="/Assets/Icons/instagram-svgrepo-com.svg"
          alt="Instagram"
          className={styles.soMeIcon}
        />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61556028067557&locale=nb_NO"
        target="_blank"
      >
        <img
          src="/Assets/Icons/facebook-svgrepo-com.svg"
          alt="Facebook"
          className={styles.soMeIcon}
        />
      </a>
      <a href="https://www.tiktok.com/@diavola.official" target="_blank">
        <img
          src="/Assets/Icons/tiktok-svgrepo-com.svg"
          alt="Tiktok"
          className={styles.soMeIcon}
        />
      </a>
      <a
        href="https://www.youtube.com/channel/UC1WGSW8CAcNq4QCR3lUoUxA"
        target="_blank"
      >
        <img
          src="/Assets/Icons/youtube-svgrepo-com.svg"
          alt="Youtube"
          className={styles.soMeIcon}
        />
      </a>
    </div>
  );
};

export default SoMeContainer;
