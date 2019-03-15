import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (

        <div className="row">
            <div className="col s12 m6 offset-m3 ">

                <Tilt className="Tilt " options={{ max: 55 }}  >
                    <div className="Tilt-inner center "><img width='30%' height='auto' src={logo} alt='logo' /></div>
                </Tilt>
            </div>
        </div>

    );
}

export default Logo;