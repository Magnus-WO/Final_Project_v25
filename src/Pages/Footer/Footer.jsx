import styles from "./Footer.module.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import useSubscribeValidation from "../../Hooks/useSubscribeValidation";
import SoMeContainer from "../../Components/SoMeContainer/SoMeContainer";

import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState({
    email: "",
  });
  const { subscribeError, setSubscribeError, validateInput } =
    useSubscribeValidation();
  const [subscribeMessage, setSubscribeMessage] = useState("");

  // Fetching info from email input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSubscribeEmail((prevData) => ({ ...prevData, [name]: value }));
    setSubscribeError({ email: "" });
  };

  // Validating email
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(subscribeEmail)) {
      setInterval(() => {
        setSubscribeError({ email: "" });
      }, 5000);
      return;
    }

    try {
      const docRef = await addDoc(collection(database, "subscriptionEmails"), {
        ...subscribeEmail,
        submittedAt: serverTimestamp(),
      });
      console.log(`document added with id ${docRef.id}`);
      setSubscribeEmail({
        email: "",
      });
      setSubscribeMessage("Subscribed!");
      setInterval(() => {
        setSubscribeMessage("");
      }, 3000);
    } catch (error) {
      setSubscribeMessage("Could not subscribe, please try again later");
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Subscribe container */}
      <section className={styles.subscribeContainer}>
        <div className={styles.subscribe}>
          <h1 className={styles.subscribeHeader}>SUBSCRIBE</h1>
          <p className={styles.subscribeIngres}>
            Join our newsletter for the latest updates and exclusive offers
          </p>
          <form
            className={styles.actionsContainer}
            noValidate
            onSubmit={handleSubmit}
          >
            <Input
              className={styles.subscribeEmailInput}
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              onChange={handleInput}
              value={subscribeEmail.email}
            ></Input>
            <Button
              className={styles.subscribeButton}
              type="submit"
              ariaLabel="button for subscribing to the newsletter"
            >
              JOIN
            </Button>
          </form>
          {subscribeError.email && (
            <p className={styles.subscribeError}>{subscribeError.email}</p>
          )}
          <p className={styles.subscribeMessage}>{subscribeMessage}</p>

          <p className={styles.subscribeinfo}>
            By subscribing you agree to our Privacy Policy and receive updates.
          </p>
        </div>
      </section>

      {/* SoMe Container */}
      <section className={styles.someContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/Assets/Images/Diavola-logo-hvit.png"
            alt="Diavola logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.connectLinksContainer}>
            <div className={styles.connectHeaderContainer}>
              <h3>CONNECT</h3>
            </div>
            {/* Links */}
            <div className={styles.connectLinks}>
              <a href="#" target="_blank">
                Band Info
              </a>
              <a
                href="https://www.bandsintown.com/a/15566203-diavola?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar"
                target="_blank"
              >
                Tour/Event dates
              </a>
              <Link to="/merch">Merch</Link>
              <a href="#" target="_blank">
                Music Videos
              </a>
            </div>
          </div>
          <div className={styles.followLinksContainer}>
            <div className={styles.followHeaderContainer}>
              <h3>FOLLOW US</h3>
            </div>
            <div className={styles.followLinks}>
              <a
                href="https://www.instagram.com/diavola.official/"
                target="_blank"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61556028067557&locale=nb_NO"
                target="_blank"
              >
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@diavola.official"
                target="_blank"
              >
                Tiktok
              </a>
              <a
                href="https://www.youtube.com/channel/UC1WGSW8CAcNq4QCR3lUoUxA"
                target="_blank"
              >
                YouTube
              </a>
              <a
                href="https://open.spotify.com/artist/0Az1ML2roJWtRYlH93PT43?si=pV0x2RwmQ0S_oZE75Zrh0g"
                target="_blank"
              >
                Spotify
              </a>
            </div>
          </div>
        </div>
        {/* Icons */}
        <div className={styles.iconsContainer}>
          <SoMeContainer className={styles.footerSomeContainer}></SoMeContainer>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
