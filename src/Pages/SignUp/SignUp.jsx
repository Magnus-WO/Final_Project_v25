import styles from "./SignUp.module.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import useSignUpValidation from "../../Hooks/useSignUpValidation";
import useAuth from "../../Hooks/useAuthentication";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const SignUp = () => {
  // State for fetching form data
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    favoriteBand: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for giving user feedback
  const [signUpFeedback, setSignUpFeedback] = useState(null);

  // Fetching form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  // Destructuring sign up validation
  const { validateSignUp, errors, setErrors } = useSignUpValidation();

  // Destructuring user authentication
  const { signUp, signUpError, user } = useAuth();

  // Redirection
  const navigate = useNavigate();

  // Handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUp(signUpData)) {
      setSignUpFeedback("Please address errors");
      return;
    }
    try {
      const userCredentials = await signUp(
        signUpData.email,
        signUpData.password
      );
      const user = userCredentials.user;

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        dateOfBirth: signUpData.dateOfBirth,
        favoriteBand: signUpData.favoriteBand,
        createdAt: serverTimestamp(),
      });
      navigate("/verify-email");
      console.log("user added");
      setSignUpData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        favoriteBand: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSignUpFeedback("Account created!");
      setInterval(() => {
        setSignUpFeedback("");
      }, 5000);
    } catch (error) {
      setSignUpFeedback("Couldn´t sign up, please try again later");
    }
  };

  return (
    <section className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <div className={styles.formGroupsContainer}>
          <fieldset className={styles.formGroup}>
            {/* --------Personal info-------- */}
            <legend className={styles.formGroupHeader}>PERSONAL INFO</legend>
            <div className={styles.formGroupInput}>
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="e.g Mark"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.firstName}
              ></Input>
              {errors && (
                <p className={styles.errorMessage}>{errors.firstName}</p>
              )}
            </div>
            <div className={styles.formGroupInput}>
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="e.g Morton"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.lastName}
              ></Input>
              {errors && (
                <p className={styles.errorMessage}>{errors.lastName}</p>
              )}
            </div>
            <div className={styles.formGroupInput}>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.dateOfBirth}
              ></Input>
              {errors && (
                <p className={styles.errorMessage}>{errors.dateOfBirth}</p>
              )}
            </div>
            <div className={styles.formGroupInput}>
              <label htmlFor="favoriteBand">Favorite Band</label>
              <Input
                type="text"
                name="favoriteBand"
                id="favoriteBand"
                placeholder="e.g Gojira"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.favoriteBand}
              ></Input>
            </div>
          </fieldset>
          {/* -------- Account details -------- */}
          <fieldset className={styles.formGroup}>
            <legend className={styles.formGroupHeader}>ACCOUNT DETAILS</legend>
            <div className={styles.formGroupInput}>
              <label htmlFor="signUpUserEmail">Email</label>
              <Input
                type="email"
                name="email"
                id="signUpUserEmail"
                placeholder="someone@example.com"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.email}
              ></Input>
              {errors && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
            <div className={styles.formGroupInput}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                name="password"
                id="password"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.password}
              ></Input>
              {errors && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>
            <div className={styles.formGroupInput}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.confirmPassword}
              ></Input>
              {errors && (
                <p className={styles.errorMessage}>{errors.confirmPassword}</p>
              )}
            </div>
          </fieldset>{" "}
        </div>
        {signUpFeedback && (
          <p className={styles.signUpFeedback}>{signUpFeedback}</p>
        )}
        <Button
          type="submit"
          ariaLabel="submit sign-up form"
          className={styles.signUpButton}
        >
          SIGN UP
        </Button>
      </form>
    </section>
  );
};

export default SignUp;
