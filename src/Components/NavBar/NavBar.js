import React from "react";

import "./navbar.css";


class NavBar extends React.Component{

    render(){

        return(
            <div className = "menu-bar-main">
                <div className= "logo-container"> <img    src = {require("../../images/hornitosLogo.png")} 
                        alt="" 
                        className = "hornitos-navbar-logo"/>
                </div>
                <div className = "logo-header-title">Citizen Hornitos</div>
            </div>
        )
    }
}

export default NavBar;