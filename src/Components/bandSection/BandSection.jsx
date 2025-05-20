import styles from "./BandSection.module.css";
import Card from "../Card/Card";
import bandMembers from "../../bandMembers";

const CardSection = ({ className, title, ingres, Filter }) => {
  return (
    <section className={`${className} ${styles.cardSection}`}>
      <div className={styles.headerContainer}>
        {title && <h1>{title}</h1>}
        {ingres && <p>{ingres}</p>}
      </div>
      <div className={styles.cardsContainer}>
        {bandMembers.map((member) => {
          return <Card member={member} />;
        })}
      </div>
    </section>
  );
};

export default CardSection;
