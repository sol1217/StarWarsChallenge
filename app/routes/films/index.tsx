import React, { useState, useEffect } from "react";
import styles from "./films.module.css";
import { Character, Film, FilmsImages } from "~/routes/films/films.types";
import returnJedi from "../../../src/assets/Return-of-the-Jedi.jpeg";
import revenge from "../../../src/assets/Revenge-of-the-Sith.png";
import empire from "../../../src/assets/The-empire.png";
import force from "../../../src/assets/The-Force-Awakens.png";
import phatom from "../../../src/assets/The-Phantom-Menace.png";
import newHope from "../../../src/assets/A-New-Hope.png";
import attack from "../../../src/assets/Attack-of-the-Clones.png";
import { Button } from "../../../@/components/ui/button";

const filmsImg: FilmsImages = {
  "A New Hope": newHope,
  "The Empire Strikes Back": empire,
  "Return of the Jedi": returnJedi,
  "The Phantom Menace": phatom,
  "Attack of the Clones": attack,
  "Revenge of the Sith": revenge,
  "The Force Awakens": force,
};

const FilmsPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/films/")
      .then((response) => response.json())
      .then((data) => setFilms(data.results))
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  useEffect(() => {
    if (selectedEpisode) {
      fetch(`https://swapi.py4e.com/api/films/${selectedEpisode}/`)
        .then((response) => response.json())
        .then((data) => {
          const characterUrls: string[] = [];
          data.characters.forEach((characterUrl: string) => {
            const characterId = characterUrl.split("/").slice(-2, -1)[0];
            characterUrls.push(
              `https://swapi.py4e.com/api/people/${characterId}/`,
            );
          });

          Promise.all(characterUrls.map((url) => fetch(url)))
            .then((responses) =>
              Promise.all(responses.map((response) => response.json())),
            )
            .then((charactersData) => {
              setCharacters(charactersData);
            })
            .catch((error) =>
              console.error("Error fetching characters:", error),
            );
        })
        .catch((error) => console.error("Error fetching film:", error));
    } else {
      setCharacters([]);
    }
  }, [selectedEpisode]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(event.target.value);
  };

  const handleRemoveCharacters = () => {
    setSelectedEpisode(null);
  };

  return (
    <div className={styles.fims}>
      <select
        style={{
          padding: "10px",
          borderRadius: "20px",
          color: "darkred",
          fontWeight: "bold",
        }}
        value={selectedEpisode || ""}
        onChange={handleSelectChange}
      >
        <option value="">Select Episode</option>
        {films.map((film) => (
          <option key={film.episode_id} value={film.episode_id.toString()}>
            {film.title}
          </option>
        ))}
      </select>
      {selectedEpisode && (
        <div className={styles.character}>
          <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>
            Characters List
          </h2>
          <div
            style={{
              gap: "20px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {characters.map((character, index) => (
              <div key={index}>{character.name}</div>
            ))}
            <Button
              onClick={handleRemoveCharacters} // Agrega el manejador de eventos aquí
              style={{
                position: "absolute",
                top: "10px",
                right: "30px",
                background: "white",
                padding: "5px",
                borderRadius: "50px",
              }}
            >
              x
            </Button>
          </div>
        </div>
      )}

      <h1
        style={{
          color: "white",
          fontSize: "35px",
          fontFamily: "serif",
          marginTop: "20px",
        }}
      >
        Star Wars Films
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {films.map((film) => (
          <div
            key={film.url}
            style={{
              margin: "10px",
              padding: "10px",
            }}
          >
            <div className={styles.filmContainer}>
              <img
                style={{
                  borderRadius: "10px",
                  width: "300px",
                  height: "190px",
                  boxShadow: "0 0 10px 0",
                }}
                src={filmsImg[film.title]}
              />
              <h2 style={{ color: "darkred" }}>{film.title}</h2>
              <p>Director: {film.director}</p>
              <p>Producer: {film.producer}</p>
              <p style={{ color: "gray" }}>Release Date: {film.release_date}</p>
              <p style={{ color: "gray" }}>Episode ID: {film.episode_id}</p>
              <p>Opening Crawl: {film.opening_crawl}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Films() {
  return <FilmsPage />;
}
