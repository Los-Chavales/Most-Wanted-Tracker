import React from "react";
import { useState, useEffect} from 'react';
import API_TRANSLATE from "../api/translator_api";
import calculate_range from "../functions/calculate_range";

function Range({ arrest_details }) {

  
  const [rangeDanger, setRangeDanger] = useState("")

  const fETCH_TRANSLATE = async (text) => {
    const RESULT = await API_TRANSLATE(text); 
    let res = RESULT.data
    let range;
    if(res){
      range = calculate_range(res.translatedText)
    }else{
      range = calculate_range(text)
    }
   
    setRangeDanger(range)
  }

  useEffect(() => { 
      fETCH_TRANSLATE(arrest_details);
  }, []);


  return(
    <>
      <div className="range">
        <p className="rangeP">Rango de Peligrosidad: {rangeDanger}</p>
        <div className="rangeBar">
          <div className="rangeBarProgress" style={{width:rangeDanger}} ></div>
        </div>
      </div>
    </>
  );
};

export default Range;