import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="row">
            <div className="col s12 m6 offset-m3 ">
                <div className="absolute">
                    <img id='inputImage' src={imageUrl} alt="face-detect" width='500px' height='auto' />


                    {console.log('box in faceRec: ', box)}

                    {
                        box.length ?
                            box.map((item, i) => <div key={i} className='bounding-box'
                                style={{
                                    top: item.topRow, right: item.rightCol,
                                    bottom: item.bottomRow, left: item.leftCol
                                }}></div>)
                            : ''
                    }
                </div>
            </div>
        </div>

    );
}

export default FaceRecognition;