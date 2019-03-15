import React from 'react';
import './Navigation.css';
const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav >
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo hide-on-small-only">Face Dectection</a>
                    <ul className="right">
                        <li><a href='#' onClick={() => onRouteChange('signout')} >Sign Out</a></li>
                    </ul>
                </div>
            </nav>
        );
    } else {
        return (

            <nav  >
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo hide-on-small-only">Face Detection</a>
                    <ul className="right">
                        <li> <a href='#' onClick={() => onRouteChange('signin')} className="">Sign In</a></li>
                        <li> <a href='#' onClick={() => onRouteChange('resgister')} className="">Register</a></li>
                    </ul>
                </div>
            </nav>

        );

    }



}

export default Navigation;