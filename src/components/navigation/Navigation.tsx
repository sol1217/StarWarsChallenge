import { useState } from "react";
import { MobilNavigation } from "./MobilNavigation/MobilNavigation";
import styles from "./navigation.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react"; // Importa Link de Remix

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div
      style={{
        width: "90vw",
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <div>
        <div className={styles.navigationContainer}>
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

        <Button className={styles.mobileButton} onClick={toggleMobileNav}>
          Open
        </Button>
      </div>

      {isMobileNavOpen && (
        <div>
          <Button
            style={{
              position: "absolute",
              left: "190px",
              top: "10px",
              textShadow: "0 0 10px yellow",
              zIndex: "99",
              border: "none",
              fontSize: "25px",
              borderRadius: "50%",
              textAlign: "center",
            }}
            onClick={closeMobileNav}
          >
            x
          </Button>
          <MobilNavigation />
        </div>
      )}
    </div>
  );
}
