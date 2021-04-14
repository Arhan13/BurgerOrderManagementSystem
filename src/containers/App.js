import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// import Radium from 'radium';
// import styled from 'styled-components';

//STYLED BUTTON EXAMPLE -->
// const StyledButton = styled.button`
//       background-color: ${props =>props.alt ? 'red' : 'green'};
//       color : white;
//       font: inherit;
//       border:1px solid blue;
//       padding: 8px;
//       cursor: pointer;
      
//       &:hover {
//       background-color: ${props =>props.alt ? 'salmon' : 'lightgreen'};
//       color:black;
//       }
// `;
//END OF STYLED BUTTON

class App extends Component {

  constructor(props){
    super(props);//Constructor of the component extending
    console.log('[App.js] constructor');
  }
  state = {
    persons: [
      {id:'jenfkent' ,name: 'Max', age: 28 },
      {id:'endeksnd' ,name: 'Manu', age: 29 },
      {id:'fbefbcke' ,name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons : false,
    showCockpit : true

  };

  static getDerivedStateFromProps(props,state){
    console.log('[App.js] getDerivedStateFromProps', props);
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})

  }

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p=>{

      return p.id===id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }
  
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState ({showPersons: !doesShow});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;
    

    if(this.state.showPersons){
      persons = (
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          />
      );
    }
    
    return (
      <div className={classes.App}>
        <button 
        onClick={()=>{
          this.setState({showCockpit:false});
        }}>
          Remove Cockpit
        </button>
        {this.state.showCockpit ? (
        <Cockpit
        title = {this.props.appTitle}
        showPersons = {this.state.showPersons}
        persons = {this.state.persons}
        clicked = {this.togglePersonHandler}
        />
        ): null}
        {persons}
      </div>
    );
  }
}

export default App;



