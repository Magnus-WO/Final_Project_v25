import styles from "./Card.module.css";

const Card = ({ member, merch }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={member.img} alt={member.alt} className={styles.cardImage} />
      </div>
      <div className={styles.textContainer}>
        {member.name && <h3>{member.name}</h3>}
        {member.text1 && <p>Instrument: {member.text1}</p>}
        {member.text2 && <p>Favorite beer: {member.text2}</p>}
      </div>
    </div>
  );
};

export default Card;
