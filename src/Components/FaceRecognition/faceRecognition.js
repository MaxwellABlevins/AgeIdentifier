import React from "react";
import './faceRecognition.css'

const faceRecognition = ({imageURL, age}) => {
return(
    <div className="center ma">
        <div className="absolute mt2 ">
            <p className="center f3">Age Estiamte: {age}</p>
            <img id="inputImage" src={imageURL} alt="" width='500px' height='auto'></img>
        </div>
    </div>
)
}

export default faceRecognition;