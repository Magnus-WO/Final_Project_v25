import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ className, children, info }) => {
  return (
    <section className={styles.modal}>
      <div className={className}>
        <h2 className={styles.modalHeader}></h2>
        <p>{info}</p>
        {children}
      </div>
    </section>
  );
};

export default Modal;
