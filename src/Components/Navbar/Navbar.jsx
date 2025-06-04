import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import SoMeContainer from "../SoMeContainer/SoMeContainer";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthContext } from "../../Context/authContext";
import { getCurrencyContext } from "../../Context/currencyContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  const [currency, setCurrency] = useState("");
  const { user } = getAuthContext();
  const [burgerIsactive, setBurgerIsActive] = useState(false);
  const navigate = useNavigate();

  // Toggling burger menu class
  const toggleBurgerMenu = () => {
    burgerIsactive ? setBurgerIsActive(false) : setBurgerIsActive(true);
  };

  const handleLogInButton = () => {
    navigate("/sign-in");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {}
  };

  // Destructuring from currency context
  const { setCurrencyConversionRate, setChosenCurrency } = getCurrencyContext();

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
    setChosenCurrency(e.target.value);
  };
  // // Getting currency chosen by user
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(
          // `http://localhost:3001/currency?q=${currency}`
          `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/pair/NOK/${query}/100`
        );
        const result = await response.json();
        const conversionRate = result.conversion_rate;
        setCurrencyConversionRate(conversionRate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrency();
    return () => {};
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
            className={styles.currencySelector}
            onChange={handleCurrency}
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
        <div className={styles.hamburgerContainer} onClick={toggleBurgerMenu}>
          <img
            src="/public/Assets/Icons/hamburger-menu-svgrepo-com.svg"
            alt="hamburger menu"
            className={styles.hamburgerIcon}
          />
        </div>
        <div
          className={
            burgerIsactive
              ? styles.navbarLinksContainerActive
              : styles.navbarLinksContainer
          }
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            HOME
          </NavLink>
          <NavLink
            to="/discography"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            DISCOGRAPHY
          </NavLink>

          <NavLink
            to="/merch"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            MERCH
          </NavLink>
          <NavLink
            to="/media"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            MEDIA
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            CONTACT
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={toggleBurgerMenu}
          >
            CART
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
