import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {


    return (
        <div className=" " >


            <h4 className="center-align white-text">
                {'Detect faces in your pictures. Give it a go! Enter a image url'}
            </h4>


            <div className="row ">
                <div className="col s12 m6 offset-m3 ">
                    <div className="card ">
                        <div className="card-content ">

                            <input className="" type="text" placeholder="url" onChange={onInputChange} />
                            <button className="waves-effect waves-light btn block" onClick={onPictureSubmit}>Detect</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );


}

export default ImageLinkForm;