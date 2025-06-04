import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={styles.pageNotFound}>
      <p>The page you searched for doesnt exist</p>
      <Link to="/">Cick here to go to the homepage</Link>
    </section>
  );
};

export default NotFound;
