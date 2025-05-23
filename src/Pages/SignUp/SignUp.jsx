import styles from "./SignUp.module.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import useSignUpValidation from "../../Hooks/useSignUpValidation";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

  const { validateSignUp, signUpErrors } = useSignUpValidation();

  // Handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUp(signUpData)) {
      setSignUpFeedback("Please address errors");
      return;
    }
    const docRef = addDoc(collection(database, "users"), signUpData);
  };

  return (
    <section className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate>
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
              {signUpErrors && (
                <p className={styles.errorMessage}>{signUpErrors.firstName}</p>
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
              {signUpErrors && (
                <p className={styles.errorMessage}>{signUpErrors.lastName}</p>
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
              {signUpErrors && (
                <p className={styles.errorMessage}>
                  {signUpErrors.dateOfBirth}
                </p>
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
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="someone@example.com"
                className={styles.formInput}
                onChange={handleInputChange}
                value={signUpData.email}
              ></Input>
              {signUpErrors && (
                <p className={styles.errorMessage}>{signUpErrors.email}</p>
              )}
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
              {signUpErrors && (
                <p className={styles.errorMessage}>{signUpErrors.password}</p>
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
              {signUpErrors && (
                <p className={styles.errorMessage}>
                  {signUpErrors.confirmPassword}
                </p>
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
