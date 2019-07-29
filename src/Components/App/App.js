import React from 'react';
import axios from "axios";
import './App.css';
import {fadeIn, slideInRight} from "react-animations";
import styled, { keyframes } from "styled-components";

import NavBar from "../NavBar/NavBar";

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      question: null,
      isFetchedQuestion: false,
      decieId: localStorage.getItem("device-id"),
      displayLeaderBoard: false
    }

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.leaderBoard = this.leaderBoard.bind(this);

    //renderFunction
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
  }

  componentDidMount(){
    this.fetchQuestion();
  }

  fetchQuestion(){

    // axios.get(`https://citizen-hornitos.herokuapp.com/questions/${this.state.deviceId}`)
    axios.get(`http://localhost:3001/questions/${this.state.deviceId}`)

      .then((response) => {
        if(response.data !== false){
          this.setState({
            question: response.data,
            isFetchedQuestion: true
          })
        }
        else{
          console.log("Server Error")
        }
      })

      .catch((err) => {
        console.log(err);
      })
  }

  leaderBoard(){

    this.setState({
      displayLeaderBoard: !this.state.displayLeaderBoard
    })
  }

  renderLeaderboard(){

    const fadeInAnimation = keyframes`${fadeIn}`;
    const Fade = styled.div`
        animation: 1s ${fadeInAnimation};
    `;

    const slideRightAnimation = keyframes`${slideInRight}`;
    const Slide = styled.div`
        animation: 0.5s ${slideRightAnimation};
    `;

    return(
      <div className = "sliding-leaderboard-menu">
        <button className = "left-side-button" onClick = {this.leaderBoard} ></button>

        <Slide className = "pull-out-bar-right">
          <div className = "leaderboard-content">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            this is the content
          </div>
        </Slide>
      </div>
    );
  }


  render(){
    return (
      <div className="App">
        {this.state.displayLeaderBoard && this.renderLeaderboard()}
        <NavBar isApp = "true" isDisplayLeader = {this.leaderBoard}/>
          {this.state.isFetchedQuestion && 
            <div>
              <div>{this.state.question.questionTopic}</div>
              <div>{this.state.question.question}</div>
              <div>{this.state.question.answers.map((element, key) => {
                return(<div key = {key}>{element}</div>)
              })}</div>
            </div>
          }
      </div>
    );  
  }
}

export default App;
