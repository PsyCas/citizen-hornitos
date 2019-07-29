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
      answer: null,
      isFetchedQuestion: false,
      decieId: localStorage.getItem("device-id"),
      displayLeaderBoard: false,
      points: 0
    }

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.fetchPoints = this.fetchPoints.bind(this);
    this.leaderBoard = this.leaderBoard.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);

    //renderFunction
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
  }

  componentDidMount(){
    this.fetchQuestion();
  }

  fetchQuestion(){

    axios.get(`https://citizen-hornitos.herokuapp.com/questions/${this.state.deviceId}`)
    // axios.get(`http://localhost:3001/questions/${this.state.deviceId}`)

      .then((response) => {
        if(response.data !== false){
          this.setState({
            question: response.data,
          })

          this.createAnswers();
          this.fetchPoints();
        }
        else{
          console.log("Server Error")
        }
      })

      .catch((err) => {
        console.log(err);
      })
  }

  fetchPoints(){

    axios.get(`https://citizen-hornitos.herokuapp.com/questions/${this.state.deviceId}`)
    // axios.get(`http://localhost:3001/users/points/${this.state.deviceId}`)

        .then((response) => {
          this.setState({
            points: response.data
          })
        })
        .catch(err =>{
          console.log(err);
        })

  }

  createAnswers(){

    let answer = [{label: this.state.question.answer, value: true}];
    let final = [];

    this.state.question.options.forEach((option) => {
      answer.push({label: option, value: false});
    })

    while(answer.length != 0){

      let index = parseInt(Math.random() * Math.floor(answer.length));
      final.push(answer[index]);
      answer.splice(index, 1);
    }

    this.setState({
      answer: final,
      isFetchedQuestion: true
    })
  }

  leaderBoard(){

    this.setState({
      displayLeaderBoard: !this.state.displayLeaderBoard
    })
  }

  checkAnswer(option){

    console.log(option.value);

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
            this is content
          </div>
        </Slide>
      </div>
    );
  }


  render(){

    return (
      <div className="App">
        {this.state.displayLeaderBoard && this.renderLeaderboard()}
        <NavBar isActivated = {this.state.displayLeaderBoard} isApp = "true" isDisplayLeader = {this.leaderBoard}/>
          {this.state.isFetchedQuestion && 
            <div>
              <div>{this.state.question.questionTopic}</div>
              <div>{this.state.question.questionIndex}. {this.state.question.question}</div>
              <div>{this.state.answer.map((option, key) => {
                  return(
                    <button className ="answer-button-layout" key={key} onClick = {() => this.checkAnswer(option)}>{option.label}</button>
                  )
              })}</div>
          </div>}
    </div>
    );  
  }
}

export default App;
