import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import { Link } from "react-router-dom"; 

function MoreDetailsY({ values }) {
  return (
    <>
    <div className="div_detail">
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={values.image} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{values.forename}</strong></li>
          <li>Nombre: {values.name}</li>
          <li>Fecha de nacimiento: {values.date_of_birth} </li>
          <li>Nacionalidad: {values.nationalities}</li>
        </ul>
      </div>
      <Link to="/report" ><button>Reportar</button></Link>

    </div>
      </div>

      </>
  );
  
}

export default MoreDetailsY;