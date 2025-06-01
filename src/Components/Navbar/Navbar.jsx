import React from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import SoMeContainer from "../SoMeContainer/SoMeContainer";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthContext } from "../../Context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  const { user } = getAuthContext();

  const navigate = useNavigate();

  const handleLogInButton = () => {
    navigate("/sign-in");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {}
  };

  return (
    <nav className={styles.navbar}>
      {/* First row */}
      <div className={styles.firstRow}>
        <div className={styles.buttonContainer}>
          {user ? (
            <Button className={styles.loginButton} onClick={handleSignOut}>
              LOG OUT
            </Button>
          ) : (
            <Button className={styles.loginButton} onClick={handleLogInButton}>
              LOG IN
            </Button>
          )}
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
        <SoMeContainer className={styles.someContainer}></SoMeContainer>
      </div>

      {/* Second row */}
      <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          HOME
        </NavLink>
        <NavLink
          to="/discography"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          DISCOGRAPHY
        </NavLink>

        <NavLink
          to="/merch"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          MERCH
        </NavLink>
        <NavLink
          to="/media"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          MEDIA
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          CONTACT
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
