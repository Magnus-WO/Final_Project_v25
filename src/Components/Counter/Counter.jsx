import styles from "./Counter.module.css";
import Button from "../Button/Button";
import { getCartContext } from "../../Context/cartContext";

const Counter = ({ item }) => {
  const { dispatch } = getCartContext();
  const handleIncrease = () => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  };
  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
    }
  };

  return (
    <div className={styles.counter}>
      <Button
        className={styles.decreaseButton}
        onClick={handleDecrease}
        ariaLabel="decrease item quantity"
      >
        -
      </Button>
      <span className={styles.counterDisplay}>{item.quantity}</span>
      <Button
        className={styles.increaseButton}
        onClick={handleIncrease}
        ariaLabel="increase item quantity"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
