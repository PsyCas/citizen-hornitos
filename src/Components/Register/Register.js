import React from "react";
import App from "../App/App";
import axios from "axios";

import NavBar from "../NavBar/NavBar";

// import stylesheet
import "./register.css";


class Register extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            isRegistered: false,
            isFetchedVerification: false,
            deviceId: localStorage.getItem("device-id"),
            isError: false,
            isTakenUsername: false
        }

        this.verifyLogin = this.verifyLogin.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);

        //redner functions
        this.renderSignUp = this.renderSignUp.bind(this);
    }

    componentDidMount(){

        if(this.state.deviceId){
            this.verifyLogin();
        }
        else{
            this.setState({
                isFetchedVerification: true
            })
        }
    }

    verifyLogin(){
        axios.get(`https://citizen-hornitos.herokuapp.com/users/verify/${this.state.deviceId}`)
            .then((response) => {
                if(response.data === true){
                    this.setState({
                        isRegistered: true,
                        isFetchedVerification: true
                    })
                }
                else{
                    this.setState({
                        isRegistered: false,
                        isFetchedVerification: true
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isRegistered: false,
                    isFetchedVerification: true
                })
            })
    }

    handleName(event){
        event.preventDefault();
        this.setState({
            username: event.target.value
        });
    }

    handleEmail(event){
        event.preventDefault();
        this.setState({
            email: event.target.value
        });
    } 
    
    submitRegistration(){

        if(this.state.username != null && this.state.email != null){

            axios.post("https://citizen-hornitos.herokuapp.com/users/validate", 
                        {   username: this.state.username, 
                            email: this.state.email})
                
                    .then((response) => {
                    if(response.data.selected){
                        this.setState({
                            isRegistered: true,
                            deviceId: response.data.confirmationCode
                        })

                        localStorage.setItem("username", this.state.username);
                        localStorage.setItem("email", this.state.email);
                        localStorage.setItem("device-id", this.state.deviceId);
                    }
                    else if(!response.data.selected){
                        this.setState({
                            isTakenUsername: true
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else{
            this.setState({
                isError: true
            })
        }
    }

    //render functions
    renderSignUp(){
        return(
            <div className = "main-container-image-signup">

                <NavBar isApp = "false"/>
                <div className = "signup-image-container-card">
                    <div className = "signup-flex-wrapper">
                        <img src = {require("../../images/agave.jpg")} alt="" className = "agave-display-image"/> 
                        <div className = "main-container-signup">
                            <div className = "sign-up-form-header">Let's get started</div>
                            
                            <div>
                                <input placeholder  = "Username" className = "form-layout" type="string" onChange={this.handleName} required/>
                                {this.state.isError && !this.state.username && <div className = "error-layout"> Enter a username before submission </div>}
                                {this.state.isTakenUsername && <div className="error-layout" id="taken-usernmae">This username is already taken.</div>}
                            </div>
                            
                            <div>
                                <input placeholder = "Email" className = "form-layout" type="email" onChange = {this.handleEmail} required/>
                                {this.state.isError && !this.state.email && <div className = "error-layout"> Enter an email before submission </div>}
                            </div>

                            <input className = "submit-button-layout" type= "submit" value = "Submit" onClick = {this.submitRegistration}/>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    

    render(){
        
        if(this.state.isRegistered && this.state.isFetchedVerification)
        {
            return(
                <App username = {this.state.username} email = {this.state.username}/>
            );
        }
        else if (!this.state.isRegistered && this.state.isFetchedVerification){
            return(
                this.renderSignUp()
            );
        }

        else{
            return(
                <div className = "main-container-loadingImage">
                    <NavBar isApp = "false"/>
                    <div className = "loading-image-container">
                        <img alt = "" src={require("../../images/spinner-1.svg")}/> 
                    </div>
                </div>
            );
        }
    }
}

export default Register; 