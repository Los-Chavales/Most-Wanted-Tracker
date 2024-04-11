import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";

function Coincidence_red({ image_url, name, lastname, date, nationality, link, arrest_details }) {
  return (
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={image_url} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{lastname}</strong></li>
          <li>Nombre: {name}</li>
          <li><button onClick={() => { setVar1(true) }}>Más detalles</button></li>
        </ul>
      </div>
      <Range arrest_details={arrest_details} />

    </div>
  );
}

export default Coincidence_red;