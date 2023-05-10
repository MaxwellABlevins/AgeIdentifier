import React from "react";
import Tilt from "react-parallax-tilt";
import './logo.css';
import brain from './logo.png';

const Logo = () => {
    return(
        <div className="ma4 mt0" >
            <Tilt className="tilt-img br2 shadow-2">
                <div style={{tiltMaxAngleX: "35",  tiltMaxAngleY: "35", }}>
                    <img className="" src={brain} alt="Brain Logo" style={{paddingTop: "20px"}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;