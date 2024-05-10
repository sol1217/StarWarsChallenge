import beru from "../../../src/assets/Beru.jpg";
import luke from "../../../src/assets/luke-skywalker.jpg";
import c3po from "../../../src/assets/C-3PO.jpg";
import r2d2 from "../../../src/assets/r2-d2.jpeg";
import darthVader from "../../../src/assets/darth-vader.jpg";
import leiaOrgana from "../../../src/assets/leia.jpg";
import owenLars from "../../../src/assets/owen.jpg";
import r5d4 from "../../../src/assets/r5-d4.jpg";
import biggsDarklighter from "../../../src/assets/biggs.jpeg";
import obiWanKenobi from "../../../src/assets/obin-wan.jpeg";

import React, { useState, useEffect } from "react";
import { PeopleImages, Person } from "~/routes/people/people.types";

const peopleImages: PeopleImages = {
  "Luke Skywalker": luke,
  "C-3PO": c3po,
  "R2-D2": r2d2,
  "Darth Vader": darthVader,
  "Leia Organa": leiaOrgana,
  "Owen Lars": owenLars,
  "Beru Whitesun lars": beru,
  "R5-D4": r5d4,
  "Biggs Darklighter": biggsDarklighter,
  "Obi-Wan Kenobi": obiWanKenobi,
};

const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("https://swapi.py4e.com/api/people/");
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div
      className="mt-{30} p-10 text-center gap-10 leading-loose flex justify-center items-center flex-col bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/823/308/desktop-wallpaper-animated-stars-aesthetic-star-wars.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxWidth: "1500px",
        margin: "20px auto",
      }}
    >
      <h1
        className="text-3xl font-serif text-white"
        style={{ textShadow: "0 0 15px black" }}
      >
        People in the Star Wars Universe
      </h1>
      <div className="p-5 flex flex-wrap justify-center items-center gap-5">
        {people.map((person) => (
          <div
            className="flex justify-center gap-5 items-center flex-col bg-white p-10 rounded-3xl shadow-md"
            style={{
              boxShadow: "0 0 10px 0 blue",
              width: "350px",
              height: "505px",
              flexWrap: "wrap",
            }}
          >
            <h2 className="text-red-600 font-bold text-lg">{person.name}</h2>

            <img
              src={peopleImages[person.name]}
              alt={person.name}
              style={{
                width: "220px",
                height: "260px",
                borderRadius: "10px",
                boxShadow: "0 0 15px 0",
              }}
            />
            <ul className="grid grid-cols-2 gap-30">
              <li>
                <strong>Gender:</strong> {person.gender}
              </li>
              <li>
                <strong>Height:</strong> {person.height}
              </li>
              <li>
                <strong>Birth Year:</strong> {person.birth_year}
              </li>
              <li>
                <strong>Mass:</strong> {person.mass}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
