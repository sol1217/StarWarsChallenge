import React, { useState, useEffect } from "react";
import styles from "./species.module.css";

import human from "../../../src/assets/human.png";
import hutt from "../../../src/assets/hutt.png";
import tradoshan from "../../../src/assets/trandoshan.png";
import rodian from "../../../src/assets/Rodian.png";
import ewok from "../../../src/assets/Ewok.png";
import wookie from "../../../src/assets/wookie.png";
import yoda from "../../../src/assets/yoda.png";
import calamari from "../../../src/assets/calamari.png";
import droid from "../../../src/assets/droid.png";
import sullustan from "../../../src/assets/sullustan.png";
import { SpecieImages, SpeciesInfo } from "~/routes/Species/species.types";
import { Button } from "@/components/ui/button";

const speciesImages: SpecieImages = {
  Human: human,
  Droid: droid,
  Wookiee: wookie,
  Rodian: rodian,
  Hutt: hutt,
  "Yoda's species": yoda,
  Trandoshan: tradoshan,
  "Mon Calamari": calamari,
  Ewok: ewok,
  Sullustan: sullustan,
};

const Species: React.FC = () => {
  const [speciesData, setSpeciesData] = useState<SpeciesInfo[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesInfo | null>(
    null,
  );

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await fetch("https://swapi.py4e.com/api/species/");
        if (!response.ok) {
          throw new Error("Failed to fetch species data");
        }
        const data = await response.json();
        setSpeciesData(data.results);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    fetchSpeciesData();
  }, []);

  const handleInformationClick = (species: SpeciesInfo) => {
    setSelectedSpecies(species);
  };

  const handleCloseClick = () => {
    setSelectedSpecies(null);
  };

  return (
    <div
      className={styles.speciesContainer}
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
        maxWidth: "1500px",
        margin: "20px auto",
      }}
    >
      <h1 style={{ color: "white", fontSize: "35px", fontFamily: "serif" }}>
        Star Wars Species
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
        {speciesData.map((species, index) => (
          <div key={index} className={styles.species}>
            <h2 style={{ color: "white" }}>{species.name}</h2>
            <img
              style={{
                borderRadius: "20px",
                width: "200px",
                height: "280px",
              }}
              src={speciesImages[species.name] || ""}
              alt={species.name}
            />
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
              onClick={() => handleInformationClick(species)}
            >
              Information
            </Button>
          </div>
        ))}

        {selectedSpecies && (
          <div className={styles.speciesElement}>
            <h2
              style={{ fontSize: "30px", color: "darkred", fontWeight: "bold" }}
            >
              {selectedSpecies.name}
            </h2>

            <table border={1}>
              <tr>
                <td>
                  <strong>Classification:</strong>
                </td>
                <td>{selectedSpecies.classification}</td>
              </tr>
              <tr>
                <td>
                  <strong>Designation:</strong>
                </td>
                <td>{selectedSpecies.designation}</td>
              </tr>
              <tr>
                <td>
                  <strong>Height:</strong>
                </td>
                <td>{selectedSpecies.average_height} cm</td>
              </tr>
              <tr>
                <td>
                  <strong>Lifespan:</strong>
                </td>
                <td>{selectedSpecies.average_lifespan} years</td>
              </tr>
              <tr>
                <td>
                  <strong>Eye Colors:</strong>
                </td>
                <td>{selectedSpecies.eye_colors}</td>
              </tr>
              <tr>
                <td>
                  <strong>Hair Colors:</strong>
                </td>
                <td>{selectedSpecies.hair_colors}</td>
              </tr>
              <tr>
                <td>
                  <strong>Skin Colors:</strong>
                </td>
                <td>{selectedSpecies.skin_colors}</td>
              </tr>
              <tr>
                <td>
                  <strong>Language:</strong>
                </td>
                <td>{selectedSpecies.language}</td>
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

export default Species;
