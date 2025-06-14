import React, { useState } from "react";
import styles from "./Merch.module.css";
import merch from "../../JS/merch";
import Card from "../../Components/Card/Card";
import { getCartContext } from "../../Context/cartContext";

const Merch = () => {
  return (
    <section className={styles.merchSection}>
      {merch.map((merch) => {
        return (
          <Card
            merch={merch}
            key={merch.id}
            className={styles.merchCard}
          ></Card>
        );
      })}
    </section>
  );
};

export default Merch;
