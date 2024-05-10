import styles from "../Vehicles/vehicles.module.css";
import React, { useEffect, useState } from "react";
import { Vehicle, VehiculeImages } from "./vehicules.types";
import sandCrawler from "../../../src/assets/Sandcrawler.png";
import t16 from "../../../src/assets/T-16-skyhoppe.png";
import x34 from "../../../src/assets/X-34-landspeeder.png";
import tieln from "../../../src/assets/TIE_LN-starfighter.png";
import snowspeeder from "../../../src/assets/Snowspeeder.png";
import tieBomber from "../../../src/assets/TIE-bomber.png";
import atAt from "../../../src/assets/AT-AT.png";
import atSt from "../../../src/assets/AT-ST.png";
import cloudCar from "../../../src/assets/cloud-car.png";
import sailBarge from "../../../src/assets/Sail-barge.png";

const VehiculesImg: { [key: string]: string } = {
  "Sand Crawler": sandCrawler,
  "T-16 skyhopper": t16,
  "X-34 landspeeder": x34,
  "TIE/LN starfighter": tieln,
  Snowspeeder: snowspeeder,
  "TIE bomber": tieBomber,
  "AT-AT": atAt,
  "AT-ST": atSt,
  "Storm IV Twin-Pod cloud car": cloudCar,
  "Sail barge": sailBarge,
};

const Vehicles: React.FC = () => {
  const [fetchedVehicles, setFetchedVehicles] = useState<Vehicle[] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://swapi.py4e.com/api/vehicles/");
        const data = await response.json();
        setFetchedVehicles(data.results);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = fetchedVehicles
    ? fetchedVehicles.filter((vehicle: Vehicle) =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className={styles.vehiclesContainer}>
        <h2 style={{ fontFamily: "serif", color: "white", fontSize: "35px" }}>
          Star Wars Vehicles
        </h2>
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ marginBottom: "15px", padding: "8px", borderRadius: "20px" }}
        />
        <div className={styles.vehiclesElements}>
          {filteredVehicles.map((vehicle: Vehicle) => (
            <div className={styles.vehiclesMainBox} key={vehicle.url}>
              <h2 style={{ color: "darkred" }}>{vehicle.name}</h2>
              <img
                style={{
                  borderRadius: "20px",
                  width: "240px",
                  height: "190px",
                }}
                src={VehiculesImg[vehicle.name] || ""}
                alt={vehicle.name}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: "rgba(252,221,45,0.7)",
                  borderRadius: "20px",
                  color: "black",
                  padding: "10px",
                  boxShadow: "10px 10px 10px 2px ",
                }}
              >
                <strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}
                <br />
                <strong>Model:</strong> {vehicle.model}
                <br />
                <strong>Passengers:</strong> {vehicle.passengers}
                <br />
                <strong>Manufacturer:</strong> {vehicle.manufacturer}
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
