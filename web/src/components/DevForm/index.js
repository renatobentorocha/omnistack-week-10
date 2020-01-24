import React, { useState, useEffect } from "react";

import { FaSpinner } from "react-icons/fa";

import "./styles.css";

export default function DevForm({ onSubmit, loading }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithub_username] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      posistion => {
        setLatitude(posistion.coords.latitude);
        setLongitude(posistion.coords.longitude);
      },
      err => console.log(err),
      { timeout: 30000 }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });

    setGithub_username("");
    setTechs("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
          name="github_username"
          type="text"
          id="github_username"
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          value={techs}
          onChange={e => setTechs(e.target.value)}
          name="techs"
          type="text"
          id="techs"
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            name="latitude"
            id="latitude"
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            name="longitude"
            id="longitude"
            required
          />
        </div>
      </div>
      <button type="submit">
        {loading ? <FaSpinner color="#fff" size={35}></FaSpinner> : "Salvar"}
      </button>
    </form>
  );
}
