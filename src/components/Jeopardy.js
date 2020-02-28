import React, { Component } from 'react';
//import our service
import JeopardyService from "../jeopardyService";
import Display from "./DisplayJep"
import Display2 from "./DisplayJep2"
import Display3 from "./DisplayJep3"

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
    constructor(props){
        super(props);
        this.client = new JeopardyService();
        this.state = {
        data: {},
        data2: {},
        data3: {},
        score: 0,
        formData: {
            answer: ''
        },
        showQuestion1: false,
        showQuestion2: false,
        showQuestion3: false
        }
    }
  //get a new random question from the API and add it to the data object in state
    getNewQuestion() {
    return this.client.getQuestion().then(result => {
        this.setState({
        data: result.data[0],
        data2: result.data[1],
        data3: result.data[2]
        })
    })
    }
  //when the component mounts, get a the first question
    componentDidMount() {
    this.getNewQuestion();
    }

    handleChange = (e) => {
    const formData = {...this.state.formData}
    formData[e.target.name] = e.target.value

    this.setState({ formData })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let points = parseInt(JSON.stringify(this.state.data.value))
        if(this.state.formData.answer === this.state.data.answer || 
            this.state.formData.answer === this.state.data2.answer ||
            this.state.formData.answer === this.state.data3.answer){
            this.setState((state, props) => ({
                score: state.score + points,
                formData: {answer:""}
            })) 
        } else {
            this.setState((state, props) => ({
                score: state.score - points,
                formData: {answer:""}
            }))
        }
        this.setState({
            showQuestion1: false,
            showQuestion2: false,
            showQuestion3: false
        })
        this.getNewQuestion()
    }

    revealQuestion1 = (e) => {
        this.setState({
            showQuestion1: true
        })
    }
    revealQuestion2 = (e) => {
        this.setState({
            showQuestion2: true
        })
    }
    revealQuestion3 = (e) => {
        this.setState({
            showQuestion3: true
        })
    }
  //display the results on the screen
  render() {
    let questionButton1 = (
        <button>Loading...</button>
    )
    let questionButton2 = (
        <button>Loading...</button>
    )
    let questionButton3 = (
        <button>Loading...</button>
    )
    let questionDiv = <div></div>

    if (this.state.data.category){
        questionButton1 = <button onClick={this.revealQuestion1}>{this.state.data.category.title}</button>
        questionButton2 = <button onClick={this.revealQuestion2}>{this.state.data2.category.title}</button>
        questionButton3 = <button onClick={this.revealQuestion3}>{this.state.data3.category.title}</button>
    }
    if (this.state.showQuestion1){
        questionButton1 = ''
        questionButton2 = ''
        questionButton3 = ''
        questionDiv = (         
        <div>
            <Display 
            handleSubmit={this.handleSubmit} 
            question={this.state.data.question}
            eventValue={this.state.formData.answer}
            handleChange={this.handleChange}
            value={this.state.data.value}
            answer={this.state.data.answer}/>
        </div> )
        
    }
    if (this.state.showQuestion2){
        questionButton1 = ''
        questionButton2 = ''
        questionButton3 = ''
        questionDiv = (        
        <div>
            <Display2
            handleSubmit={this.handleSubmit} 
            question={this.state.data2.question}
            eventValue={this.state.formData.answer}
            handleChange={this.handleChange}
            value={this.state.data2.value}
            answer={this.state.data2.answer}/>
        </div> )
        
    }
    if (this.state.showQuestion3){
        questionButton1 = ''
        questionButton2 = ''
        questionButton3 = ''
        questionDiv = (        
        <div>
            <Display3
            handleSubmit={this.handleSubmit} 
            question={this.state.data3.question}
            eventValue={this.state.formData.answer}
            handleChange={this.handleChange}
            value={this.state.data3.value}
            answer={this.state.data3.answer}/>
        </div> )
        
    }
    return(
    <div>
        <div className="score">
            <h1>Your score: {this.state.score}</h1>
        </div>
        <div>
            {questionButton1}
            {questionButton2}
            {questionButton3}
            {questionDiv}
        </div>
    </div>
    )
  }
}
export default Jeopardy;