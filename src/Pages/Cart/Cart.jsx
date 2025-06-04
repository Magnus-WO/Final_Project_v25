import React from "react";
import styles from "./Cart.module.css";
import { getCartContext } from "../../Context/cartContext";
import { getAuthContext } from "../../Context/authContext";
import { getCurrencyContext } from "../../Context/currencyContext";
import { useMemo, useState } from "react";

import Button from "../../Components/Button/Button";
import Counter from "../../Components/Counter/Counter";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import useCheckoutValidation from "../../Hooks/useCheckoutValidation";
import { data, Link, useNavigate } from "react-router-dom";

import { database } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Cart = () => {
  const { cart, dispatch } = getCartContext();
  const { user } = getAuthContext();
  const [showRedirectionModal, setShowRedirectionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentFormInfo, setPaymentFormInfo] = useState({
    paymentEmail: "",
    address: "",
    city: "",
    zip: "",
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("Your cart is empty.");

  const navigate = useNavigate();

  // Opening checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      setCartMessage(
        "Your cart is currently empty, please add some merch in order to check out"
      );
      setInterval(() => {
        setCartMessage("Your cart is empty.");
      }, 5000);
      return;
    }
    if (user) {
      setShowPaymentModal(true);
      setShowRedirectionModal(false);
      setConfirmationMessage("");
    } else {
      setShowRedirectionModal(true);
      setShowPaymentModal(false);
    }
  };

  // Exiting checkout
  const exitCheckout = () => {
    setShowPaymentModal(false);
    setPaymentFormInfo({
      paymentEmail: "",
      address: "",
      city: "",
      zip: "",
    });
    setConfirmationMessage("");
  };

  // Fetching payment form inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPaymentFormInfo((prevData) => ({ ...prevData, [name]: value }));
  };
  // Destructuring from useCheckoutValidation
  const { validateCheckoutForm, checkoutErrors } = useCheckoutValidation();

  // Submitting order
  const submitOrder = async (e) => {
    e.preventDefault();

    if (!validateCheckoutForm(paymentFormInfo)) {
      setConfirmationMessage("Please fill out your details");

      return;
    }
    const userOrder = (paymentForInfo) => ({ ...paymentForInfo, cart });
    try {
      const docRef = await addDoc(
        collection(database, "orders"),
        userOrder(paymentFormInfo)
      );
      setConfirmationMessage("Order completed!");
      handleClearCart();
      setInterval(() => {
        setShowPaymentModal(false);
      }, 5000);
    } catch (error) {
      setConfirmationMessage(
        "Sadly we couldn´t coplete your order. Please try again later"
      );
    }
  };

  // Emptying cart
  const handleClearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  // Removing item from cart
  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Converting to users chosen currency
  const { currencyConversionRate, chosenCurrency } = getCurrencyContext();

  // Adding cart total
  const cartTotalPrice = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  return (
    <section className={styles.cart}>
      {cart.length === 0 ? (
        <p>{cartMessage}</p>
      ) : (
        <div className={styles.cartListContainer}>
          <ul className={styles.cartList}>
            {cart.map((item) => {
              return (
                <li className={styles.cartItem} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartImage}
                  />
                  <h2>{item.name}</h2>
                  <p>
                    Price: {(item.price * currencyConversionRate).toFixed(2)}{" "}
                    {chosenCurrency}
                  </p>
                  <p>
                    Total:{" "}
                    {(
                      item.price *
                      currencyConversionRate *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                  <p>Size: {item.selectedSize}</p>
                  <div className={styles.cartItemButtonsContainer}>
                    <Counter item={item}></Counter>

                    <Button
                      ariaLabel="Remove item from cart"
                      className={styles.cartDeleteButton}
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Button
        className={styles.checkoutButton}
        ariaLabel="check out"
        type="button"
        onClick={handleCheckout}
      >
        Check out
      </Button>
      {showPaymentModal && (
        <Modal className={styles.paymentModal}>
          <form
            noValidate
            className={styles.paymentForm}
            onSubmit={submitOrder}
          >
            <h2>
              Your total: {cartTotalPrice * currencyConversionRate}
              {chosenCurrency}
            </h2>
            <div className={styles.paymentInfoContainer}>
              <label htmlFor="paymentEmail">Email</label>
              <Input
                type="email"
                name="paymentEmail"
                id="paymentEmail"
                placeholder="your@email.com"
                className={styles.paymentFormInput}
                value={paymentFormInfo.paymentEmail}
                onChange={handleInput}
              ></Input>
            </div>
            <div className={styles.paymentInfoContainer}>
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="e.g shire road 1"
                className={styles.paymentFormInput}
                value={paymentFormInfo.address}
                onChange={handleInput}
              ></Input>
            </div>
            <div className={styles.paymentInfoContainer}>
              <label htmlFor="city">City</label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="e.g Oslo"
                className={styles.paymentFormInput}
                value={paymentFormInfo.city}
                onChange={handleInput}
              ></Input>
            </div>
            <div className={styles.paymentInfoContainer}>
              <label htmlFor="zip">Zip code</label>
              <Input
                type="text"
                name="zip"
                id="zip"
                className={styles.paymentFormInput}
                value={paymentFormInfo.zip}
                onChange={handleInput}
              ></Input>
            </div>
            <p className={styles.confirmationMessage}>{confirmationMessage}</p>
            <Button
              type="submit"
              ariaLabel="complete order"
              className={styles.completeOrderButton}
            >
              Complete order
            </Button>
            <Button
              type="button"
              ariaLabel="exit checkout"
              className={styles.exitCheckoutButton}
              onClick={exitCheckout}
            >
              Exit
            </Button>
          </form>
        </Modal>
      )}
      {showRedirectionModal && (
        <Modal className={styles.redirectionModal}>
          <p>
            In order to complete your purchase you need to sign in. If you
            already have an account please click on the "Go to sign-in page".
            Otherwise, click on "Go to sign-up" to create a an account. Once
            signed in, you'll be automatically redirected to checkout.
          </p>
          <div className={styles.redirectLinksContainer}>
            <Link to="/sign-in" className={styles.redirectLink}>
              Go to sign-in
            </Link>
            <Link to="/sign-up" className={styles.redirectLink}>
              Go to sign-up
            </Link>
          </div>
          <Button
            onClick={() => setShowRedirectionModal(false)}
            className={styles.closeModalButton}
          >
            Cancel
          </Button>
        </Modal>
      )}
    </section>
  );
};

export default Cart;
