import styles from "./mobil.module.css";
import { Link } from "@remix-run/react";

export const MobilNavigation = () => {
  return (
    <>
      <div className={styles.mobilNavigation}>
        <Link
          to="/people"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          People
        </Link>
        <Link
          to="/Planets"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Planets
        </Link>
        <Link
          to="/films"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Films
        </Link>
        <Link
          to="/species"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Species
        </Link>
        <Link
          to="/vehicles"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Vehicles
        </Link>
        <Link
          to="/starships"
          style={{
            color: "gray",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Starships
        </Link>
      </div>
    </>
  );
};
