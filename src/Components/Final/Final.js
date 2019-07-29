import React from "react";
import axios from "axios";

class Final extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            var: null,
            deviceId: localStorage.getItem("device-id"),
            points: 0,
            isFetched: false

        }

        this.updatePoints = this.updatePoints.bind(this);
        this.fetchPoints = this.fetchPoints.bind(this);     
    }

    componentDidMount(){
        this.updatePoints();
    }

    updatePoints(){
        // axios.get(`http://localhost:3001/users/update/points/${this.state.deviceId}`)
        axios.get(`https://citizen-hornitos.herokuapp.com/users/update/points/${this.state.deviceId}`)
            .then((response) => {
                console.log(response.data);
                this.fetchPoints();
            })
            .catch((err) => {
                console.log(err);
            })
    }
        
    fetchPoints(){

        // axios.get(`https://citizen-hornitos.herokuapp.com/users/points/${this.state.deviceId}`)
        axios.get(`https://citizen-hornitos.herokuapp.com/users/points/${this.state.deviceId}`)

            .then((response) => {
                this.setState({
                    points: response.data,
                    isFetched: true
                })
            })
            .catch(err =>{
                console.log(err);
            })

    }

    render(){
        return(
            <div>
                <div>This is the final screen</div>
                {this.state.isFetched && <div>{this.state.points}</div>}
                <div>points mate.</div>
            </div>
        )
    }
}

export default Final; 