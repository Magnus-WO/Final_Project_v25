import React, { useState } from "react";
import styles from "./SignIn.module.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import useSignInValidation from "../../Hooks/useSignInValidation";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  validatePassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [logInCredentials, setLogInCredentials] = useState({
    logInEmail: "",
    logInPassword: "",
  });
  const [logInError, setLogInError] = useState("");

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // Fetching log in inputs
  const handleLogInInputChange = (e) => {
    const { name, value } = e.target;
    setLogInCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Destructuring signInValidation
  const { validateSignIn, errors, setErrors } = useSignInValidation();

  // Redirecting
  const navigate = useNavigate();

  // Reset password
  // Getting reset email
  const getResetEmail = (e) => {
    setResetPasswordEmail(e.target.value);
  };

  // Displaying reset modal
  const displayResetModal = () => {
    if (showResetPasswordModal) {
      setShowResetPasswordModal(false);
      setResetMessage("");
      setResetPasswordEmail("");
    } else {
      setShowResetPasswordModal(true);
    }
  };

  // Resetting password
  const resetPassword = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!resetPasswordEmail.trim()) {
      setResetMessage("Please enter an email");
      return;
    }
    if (!emailRegex.test(resetPasswordEmail)) {
      setResetMessage("Please enter a valid email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      setResetMessage(
        "An email with the password reset has been sent to your email, please check your inbox"
      );

      setInterval(() => {
        setResetPasswordEmail("");
      }, 5000);
    } catch (error) {
      setResetMessage("Couldn´t send email, please try again later");
    }
  };

  // Log users in
  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(logInCredentials)) {
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        logInCredentials.logInEmail,
        logInCredentials.logInPassword
      );

      navigate("/");
      setLogInError("");
    } catch (error) {
      setLogInError("Wrong email or password");
      console.log(error);
    }
  };

  return (
    <>
      <section className={styles.formWrapper}>
        <form className={styles.signInForm} noValidate onSubmit={handleLogIn}>
          <h2>LOG IN</h2>
          <fieldset className={styles.formField}>
            <div className={styles.formGroup}>
              <label htmlFor="logInEmail">Email</label>
              <Input
                type="email"
                name="logInEmail"
                id="logInEmail"
                placeholder="your@email.com"
                className={styles.logInInput}
                onChange={handleLogInInputChange}
                value={logInCredentials.logInEmail}
              ></Input>
              <p className={styles.errorMessage}>{errors.logInEmail}</p>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="logInPassword">Password</label>
              <Input
                type="password"
                name="logInPassword"
                id="logInPassword"
                className={styles.logInInput}
                onChange={handleLogInInputChange}
                value={logInCredentials.logInPassword}
              ></Input>
              <p className={styles.errorMessage}>{errors.logInPassword}</p>
            </div>
          </fieldset>
          <p className={styles.errorMessage}>{logInError}</p>
          <Button type="submit" className={styles.logInButton}>
            LOG IN
          </Button>
          <Button
            type="button"
            className={styles.forgotPasswordButton}
            onClick={displayResetModal}
          >
            Forgot Password?
          </Button>
          <Link to="/sign-up" className={styles.signUpLink}>
            No account? Click here to sign up
          </Link>
        </form>
        {showResetPasswordModal && (
          <section className={styles.resetPasswordWrapper}>
            <form
              className={styles.resetPasswordModal}
              onSubmit={resetPassword}
              noValidate
            >
              <h2>Reset Password</h2>
              <Input
                type="email"
                name="resetPasswordEmail"
                id="resetPasswordEmail"
                className={styles.resetPasswordEmail}
                placeholder="your@email.com"
                onChange={getResetEmail}
                value={resetPasswordEmail}
              ></Input>
              <p className={styles.errorMessage}>{resetMessage}</p>
              <Button className={styles.sendResetEmailButton} type="submit">
                Send reset email
              </Button>
              <Button
                className={styles.closeResetModal}
                type="button"
                onClick={displayResetModal}
              >
                Close
              </Button>
            </form>
          </section>
        )}
      </section>
    </>
  );
};

export default SignIn;
