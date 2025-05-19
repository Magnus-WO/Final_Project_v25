import React from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* First row */}
      <div className={styles.firstRow}>
        <div className={styles.buttonContainer}>
          <Button className={styles.loginButton}>Log in</Button>
        </div>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img
              src="/Assets/Images/Diavola-logo-hvit.png"
              alt="Diavola logo"
              className={styles.navbarLogo}
            />
          </Link>
        </div>
        <div className={styles.someContainer}>
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
      </div>

      {/* Second row */}
      <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/discography"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Discography
        </NavLink>

        <NavLink
          to="/merch"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Merch
        </NavLink>
        <NavLink
          to="/media"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Media
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
