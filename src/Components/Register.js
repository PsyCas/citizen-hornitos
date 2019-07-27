import React from "react";
import App from "../App";
import axios from "axios";


class Register extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            isRegistered: false,
            isFetchedVerification: false,
            deviceId: localStorage.getItem("device-id"),
        }

        this.verifyLogin = this.verifyLogin.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentDidMount(){

        if(this.state.deviceId){
            this.verifyLogin();
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

        axios.post("https://citizen-hornitos.herokuapp.com/users/validate", {username: this.state.username, email: this.state.email})
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
            })
            .catch((err) => {
                console.log(err);
            })
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
                <div>
                    <label>Choose username</label>
                    <input type="string" onChange={this.handleName} required/>
                
                    <label>Enter your email</label>
                    <input type="email" onChange = {this.handleEmail} required/>

                    <input type= "submit" value = "Submit" onClick = {this.submitRegistration}/>
                </div> 
            );
        }
        
        else{
            <div>
                <img alt = "" src={require("../images/spinner-1.svg")}/> 
            </div>
        }
    }
}

export default Register; 