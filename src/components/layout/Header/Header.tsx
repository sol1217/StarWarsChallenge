import star from "../../../assets/starwars-logo.png";
import Navigation from "../../navigation/Navigation";
import styles from "../Header/header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={star} alt="logo star wars" width={200} height={100} />
      <div className="flex justify-center">
        <Navigation />
      </div>
    </div>
  );
};
