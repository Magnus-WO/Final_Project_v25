import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import SoMeContainer from "../SoMeContainer/SoMeContainer";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthContext } from "../../Context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  const [currency, setCurrency] = useState("");
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

  // Getting currency chosen by user
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/currency?q=${currency}`
        );
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrency();
    return () => {
      setCurrency("");
    };
  }, [currency]);

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
          <select
            name="currency"
            id="currency"
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value="">Select currency</option>
            <option value="NOK">NOK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="SEK">SEK</option>
            <option value="DKK">DKK</option>
          </select>
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
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          CART
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
