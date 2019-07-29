import React from "react";
import axios from "axios";

import App from "../App/App";
import "./final.css"

class Final extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            var: null,
            deviceId: localStorage.getItem("device-id"),
            points: 0,
            isFetched: false,
        }

        this.updatePoints = this.updatePoints.bind(this);
        this.fetchPoints = this.fetchPoints.bind(this);     
    }

    componentDidMount(){
        
        if(this.props.isCorrect) {
            this.updatePoints();
        }
        else{
            this.fetchPoints();
        }
    }

    updatePoints(){
        axios.get(`https://citizen-hornitos.herokuapp.com/users/update/points/${this.state.deviceId}`)
            .then((response) => {
                this.fetchPoints();
            })
            .catch((err) => {
                console.log(err);
            })
    }
        
    fetchPoints(){

        axios.get(`https://citizen-hornitos.herokuapp.com/users/points/${this.state.deviceId}`)

            .then((response) => {
                this.setState({
                    points: response.data.points,
                    isFetched: true
                })
            })
            .catch(err =>{
                console.log(err);
            })

    }

    resetGame(){
        this.setState({
            isReset: true
        })
    }

    render(){
        return(
            <div className = "scores-wrapper">
                <div className = "final-score-container">
                    {this.state.isFetched && <div className = "score-layout">Score: {this.state.points}</div>}
                    <iframe src="https://giphy.com/embed/3o6ZtiOtxZPhbgjegw" width="300" height="150" frameBorder="0" className ="giphy-embed" allowFullScreen></iframe>
                    <button className = "button-layout-score"><a className = "button-layout-score" href = "https://citizen-hornitos.herokuapp.com">Take another shot?</a></button>
                </div>
            </div>
        )
    }
}

export default Final; 