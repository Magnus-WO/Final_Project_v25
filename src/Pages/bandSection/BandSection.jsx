import styles from "./BandSection.module.css";
import Card from "../../Components/Card/Card";
import bandMembers from "../../JS/bandMembers";

const CardSection = ({ className, Filter }) => {
  return (
    <section className={`${className} ${styles.cardSection}`}>
      <div className={styles.headerContainer}>
        <h1>OUR BAND</h1>
        <p>Meet the members of Diavola</p>
      </div>
      <div className={styles.cardsContainer}>
        {bandMembers.map((member) => {
          return (
            <Card
              member={member}
              className={styles.memberCard}
              key={member.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CardSection;
