import React from "react";

import "./navbar.scss";


class NavBar extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            isActiveButton: false
        }

        this.toggleClickMenu = this.toggleClickMenu.bind(this);
        this.toggleClickErrorHandler = this.toggleClickErrorHandler.bind(this);
        
    }

    componentDidUpdate(){
        if(this.props.isActivated != this.state.isActiveButton){
            this.toggleClickErrorHandler();
        }
    }

    toggleClickMenu(){

        this.setState({
            isActiveButton: !this.state.isActiveButton
        })

        this.props.isDisplayLeader();
    }

    toggleClickErrorHandler(){
        this.setState({
            isActiveButton: this.props.isActivated
        })
    }

    render(){

        if(this.props.isApp){
        
            return(
                <div className = "menu-bar-main">
                    <div className = "logo-text-wrapper">
                        <div className= "logo-container"> 
                            <img    
                                src = {require("../../images/hornitosLogo.png")} 
                                alt="" 
                                className = "hornitos-navbar-logo smaller-one"/>
                        </div>
                        <div className = "logo-header-title smaller-one" >Citizen Hornitos</div>
                    </div>
                    <a id="hamburger-icon" className = {this.state.isActiveButton? "active": "inactive" } title="Menu" onClick = {this.toggleClickMenu}>
                        <span className ="line line-1"></span>
                        <span className ="line line-2"></span>
                        <span className ="line line-3"></span>
                    </a> 
                </div>
            )
        }
        else{
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
}

export default NavBar;