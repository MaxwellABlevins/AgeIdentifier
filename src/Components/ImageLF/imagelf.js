import React from "react";
import './imagelf.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
return(
    <div className="All">
        <p className="f3">
            {'This website can predict ages. Imput an image below.'}
        </p>
        <div className="center">
            <div className="TextandButton center pa4 br2 shadow-5"> 
                <input type="text" className="TextBox f3 w-70 center " onKeyUpCapture={onInputChange}/>
                <button className="Button w-25 grow link ph3 pv2 dib" onClick={onSubmit}>Find Face!</button>
            </div>
        </div>
    </div>
)
}

export default ImageLinkForm;