import React, { useState, useEffect } from "react";
import alderaan from "../../../src/assets/Alderaan.jpg";
import tatooine from "../../../src/assets/Tatooine.jpg";
import endor from "../../../src/assets/Endor.png";
import coruscant from "../../../src/assets/Coruscant.jpg";
import yavin from "../../../src/assets/Yavin.jpg";
import hoth from "../../../src/assets/Hoth.jpg";
import dagobah from "../../../src/assets/Dagobah.jpg";
import bespin from "../../../src/assets/bespin.jpg";
import naboo from "../../../src/assets/Naboo.jpg";
import kamino from "../../../src/assets/kamino.jpeg";

import styles from "../Planets/planets.module.css";
import { PlanetImages, PlanetInformation } from "~/routes/Planets/planetsTypes";

const planetImages: PlanetImages = {
  Tatooine: tatooine,
  Alderaan: alderaan,
  Endor: endor,
  Coruscant: coruscant,
  "Yavin IV": yavin,
  Hoth: hoth,
  Dagobah: dagobah,
  Bespin: bespin,
  Naboo: naboo,
  Kamino: kamino,
};

export default function Planets() {
  const [fetchedPlanets, setFetchedPlanets] = useState<PlanetInformation[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://swapi.py4e.com/api/planets/");
        const data = await response.json();
        setFetchedPlanets(data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div className="md:ml-20 lg:ml-50">
      <div className={styles.planet}>
        <h2 className="font-serif text-white text-3xl">Star Wars Planets</h2>
        <div
          className="flex justify-center items-center"
          style={{
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {fetchedPlanets.map((planet, index) => (
            <div
              key={index}
              className=" text-white shadow-md flex justify-center items-center flex-col gap-5 rounded-lg"
              style={{
                boxShadow: "0 4px 6px 0px",
                width: "300px",
                borderRadius: "20px",
                height: "450px",
                padding: "10px",
                margin: "10px",
              }}
            >
              <img
                style={{
                  borderRadius: "20px",
                  width: "200px",
                  height: "190px",
                }}
                src={planetImages[planet.name] || ""}
                alt={planet.name}
              />

              <h2 className="font-bold text-lg">{planet.name}</h2>
              <div
                className=" bg-yellow-400 bg-opacity-65 rounded-lg text-white shadow-md"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderRadius: "20px",
                  padding: "10px",
                  boxShadow: "0 0 7px 0",
                }}
              >
                <strong>Climate:</strong> {planet.climate}
                <strong>Diameter:</strong> {planet.diameter}
                <strong>Terrain:</strong> {planet.terrain}
                <strong>Population:</strong> {planet.population}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
