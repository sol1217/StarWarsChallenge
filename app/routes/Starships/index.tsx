import React, { useEffect, useState } from "react";
import styles from "~/routes/Starships/starships.module.css";
import { Button } from "../../../@/components/ui/button";
import {
  StarshipsImages,
  StarshipsInfo,
} from "~/routes/Starships/starshipsTypes";
import yWing from "../../../src/assets/Y-wing.png";
import starDestroyer from "../../../src/assets/Star-Destroyer.png";
import sentinel from "../../../src/assets/Sentinel.png";
import deathStar from "../../../src/assets/Death-Star.png";
import millenniumFalcon from "../../../src/assets/Millennium-Falcon.png";
import xWing from "../../../src/assets/Xwing.png";
import tieAdvanced from "../../../src/assets/TIE-Advanced.png";
import executor from "../../../src/assets/Executor.png";
import rebelTransport from "../../../src/assets/Rebel-transport.png";
import cr90 from "../../../src/assets/CR90-corvette.png";

const starshipsImg: StarshipsImages = {
  "Star Destroyer": starDestroyer,
  "Sentinel-class landing craft": sentinel,
  "Death Star": deathStar,
  "Millennium Falcon": millenniumFalcon,
  "Y-wing": yWing,
  "X-wing": xWing,
  "TIE Advanced x1": tieAdvanced,
  Executor: executor,
  "Rebel transport": rebelTransport,
  "CR90 corvette": cr90,
};

const Starships: React.FC = () => {
  const [starshipsData, setStarshipsData] = useState<StarshipsInfo[]>([]);
  const [selectedStarships, setSelectedStarships] =
    useState<StarshipsInfo | null>(null);

  useEffect(() => {
    const fetchStarshipsData = async () => {
      try {
        const response = await fetch("https://swapi.py4e.com/api/starships/");
        if (!response.ok) {
          throw new Error("Failed to fetch starships data");
        }
        const data = await response.json();
        setStarshipsData(data.results);
      } catch (error) {
        console.error("Error fetching starships data:", error);
      }
    };

    fetchStarshipsData();
  }, []);

  const handleInformationClick = async (starshipUrl: string) => {
    try {
      const response = await fetch(starshipUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch starship information");
      }
      const data = await response.json();
      setSelectedStarships(data);
    } catch (error) {
      console.error("Error fetching starship information:", error);
    }
  };

  const handleCloseClick = () => {
    setSelectedStarships(null);
  };

  return (
    <div className={styles.starshipsContainer}>
      <h1
        style={{
          color: "white",
          fontSize: "35px",
          fontFamily: "serif",
        }}
      >
        Star Wars Starships
      </h1>
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.8",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "space-around",
        }}
      >
        {starshipsData.map((starship, index) => (
          <div key={index} className={styles.starships}>
            <img
              style={{
                borderRadius: "20px",
                width: "280px",
                height: "280px",
              }}
              src={starshipsImg[starship.name] || ""}
              alt={starship.name}
            />
            <h2 style={{ color: "white" }}>{starship.name}</h2>

            <Button
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 0 10px 0 white",
                cursor: "pointer",
                position: "relative",
                marginTop: "20px",
                background: "yellow",
                fontWeight: "bold",
              }}
              onClick={() => handleInformationClick(starship.url)}
            >
              Information
            </Button>
          </div>
        ))}

        {selectedStarships && (
          <div className={styles.starshipsElement}>
            <h2 style={{ fontSize: "30px", color: "darkred" }}>
              {selectedStarships.name}
            </h2>

            <table border={1}>
              <tr>
                <td>
                  <strong>Consumables:</strong>
                </td>
                <td>{selectedStarships.consumables}</td>
              </tr>
              <tr>
                <td>
                  <strong>Passengers:</strong>
                </td>
                <td>{selectedStarships.passengers}</td>
              </tr>
              <tr>
                <td>
                  <strong>Length:</strong>
                </td>
                <td>{selectedStarships.length} cm</td>
              </tr>
              <tr>
                <td>
                  <strong>MGLT:</strong>
                </td>
                <td>{selectedStarships.MGLT}</td>
              </tr>
              <tr>
                <td>
                  <strong>Cargo Capacity:</strong>
                </td>
                <td>{selectedStarships.cargo_capacity}</td>
              </tr>
              <tr>
                <td>
                  <strong>Crew:</strong>
                </td>
                <td>{selectedStarships.crew}</td>
              </tr>
              <tr>
                <td>
                  <strong>Manufacturer:</strong>
                </td>
                <td>{selectedStarships.manufacturer}</td>
              </tr>
            </table>

            <Button
              style={{
                position: "absolute",
                top: "15px",
                right: "30px",
                fontSize: "25px",
                borderRadius: "50px",
                border: "none",
                textShadow: "0 0 40px yellow",
              }}
              onClick={handleCloseClick}
            >
              x
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Starships;
