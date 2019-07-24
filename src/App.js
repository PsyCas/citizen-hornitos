import React from 'react';
import axios from "axios";
import './App.css';

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      question: null,
      isFetchedQuestion: false
    }

    this.fetchQuestion.bind(this);
  }

  componentDidMount(){
    this.fetchQuestion();
  }

  fetchQuestion(){

    axios.get("http://localhost:3001/questions")

      .then((response) => {
        if(response.data != false){
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

  render(){
    return (
      <div className="App">
          {this.state.isFetchedQuestion && 
            <div>
              <div>{this.state.question.questionTopic}</div>
              <div>{this.state.question.question}</div>
              <div>{this.state.question.answers.map((element) => {
                return(<div>{element}</div>)
              })}</div>
            </div>
          }
      </div>
    );  
  }
}

export default App;
