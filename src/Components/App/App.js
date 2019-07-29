import React from 'react';
import axios from "axios";
import './App.css';
import {fadeIn, slideInRight} from "react-animations";
import styled, { keyframes } from "styled-components";

import NavBar from "../NavBar/NavBar";
import FinalScreen from "../Final/Final";
import Leaderboard from "../Leaderboard/leaderboard";

import schedule from "node-schedule";


// rules for making background fetches
let resetRule = new schedule.RecurrenceRule();
resetRule.dayOfWeek = new schedule.Range(0,6);
resetRule.minute = 0;

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      question: null,
      answer: null,
      isFetchedQuestion: false,
      deviceId: localStorage.getItem("device-id"),
      displayLeaderBoard: false,
      points: 0,
      isSelectedOption: false,
      selectedOption: null,
      isConfirmed: false,
      confirmationColor: null,
      showFinalScreen: false,
      leaderboardData: null,
      isFirstLeaderboardFetch: false,
    }

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.fetchLeaderBoard = this.fetchLeaderBoard.bind(this);
    this.leaderBoard = this.leaderBoard.bind(this);
    this.resetMultiplier = this.resetMultiplier.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);

    //renderFunction
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
  }

  componentDidMount(){
    this.fetchQuestion();
    this.fetchLeaderBoard();

    this.leaderboardInterval = setInterval(() => {
      this.fetchLeaderBoard();
    }, 10000);

    localStorage.setItem("time", Date.now());

    schedule.scheduleJob(resetRule, () => {
      this.resetMultiplier();
    });

    if(Date.now() - parseInt(localStorage.getItem("time")) >= 60*60*1000){
      this.resetMultiplier();
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    clearInterval(this.leaderboardInterval);
  }

  resetMultiplier(){
    axios.get(`https://citizen-hornitos.herokuapp.com/users/reset/multiplier/${this.state.deviceId}`)
      .then((response) => {
      })
      .catch((err) => console.log(err));
  }

  fetchLeaderBoard(){
    axios.get("https://citizen-hornitos.herokuapp.com/users/leaderboard")
      .then(response => {
        this.setState({
          leaderboardData: response.data,
          isFirstLeaderboardFetch: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchQuestion(){

    axios.get(`https://citizen-hornitos.herokuapp.com/questions/${this.state.deviceId}`)
      .then((response) => {
        if(response.data !== false){
          this.setState({
            question: response.data,
          })

          this.createAnswers();
        }
        else{
          console.log("Server Error")
        }
      })

      .catch((err) => {
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
      displayLeaderBoard: !this.state.displayLeaderBoard,
      isFirstLeaderboardFetch: false
    })
  }

  checkAnswer(option){

    this.setState({
      selectedOption: option,
      isSelectedOption: true
    })
  }

  submitAnswer(){

    if(this.state.selectedOption.value){
      this.setState({
        isConfirmed: true,
        confirmationColor: "#00ff00",
      })
    }
    else if(!this.state.selectedOption.value){
      this.setState({
        isConfirmed: true,
        confirmationColor: "#ff0000",
      })
    }

    this.interval = setInterval(() => {
      this.setState({
        showFinalScreen: true
      });
      clearInterval(this.interval);
    }, 2000)
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
        {!this.state.isFirstLeaderboardFetch &&
        <Slide className = "pull-out-bar-right">
          <div className = "leaderboard-content">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
              <Leaderboard data = {this.state.leaderboardData}/>
          </div>
        </Slide>}
        
        {this.state.isFirstLeaderboardFetch &&
        <div className = "pull-out-bar-right">
          <div className = "leaderboard-content">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
              <Leaderboard data = {this.state.leaderboardData}/>
          </div>
        </div>}

      </div>
    );
  }

  renderQuestion(){

    let buttonBackground = {
      background: `${this.state.confirmationColor}`
    }

    return(
      <div className = "flex-wrapper-citizenship">
        <div className = "citizenship-question-container">
            <div className = "citizenship-question-category">{this.state.question.questionTopic}</div>
            <div className = "citizenship-question">{this.state.question.questionIndex}. {this.state.question.question}</div>
            <div className = "citizenship-question-options">{this.state.answer.map((option, key) => {
                
                if (this.state.isConfirmed && option.label === this.state.selectedOption.label){
                  return(
                    <button style = {buttonBackground} className = "answer-button-layout animated-button" key={key} onClick = {() => this.checkAnswer(option)}>{option.label}</button>
                  ) 
                }
                else{
                  return(
                      <button className ="answer-button-layout" key={key} onClick = {() => this.checkAnswer(option)}>{option.label}</button>
                  )
                }
            })}</div>
            {this.state.isSelectedOption && <button className = "submit-button-layout-citizenship" onClick = {this.submitAnswer}>Submit Answer</button>}
        </div>
      </div>
    )
  }


  render(){

    return (
      <div className="App">
        <div className = "App-content">
          {this.state.displayLeaderBoard && this.renderLeaderboard()}
          <NavBar isActivated = {this.state.displayLeaderBoard} isApp = "true" isDisplayLeader = {this.leaderBoard}/>
          {this.state.isFetchedQuestion && !this.state.showFinalScreen && this.renderQuestion()}
          {this.state.isFetchedQuestion && this.state.showFinalScreen && <FinalScreen isCorrect ={this.state.selectedOption.value}/>}
        </div>
    </div>
    );  
  }
}

export default App;
