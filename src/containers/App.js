import React, { Component } from 'react';
import './style.css';

import { slideInLeft, slideInRight } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/*=====================================================================
// Animated styles using Aphrodite and React Animations.
=====================================================================*/
const styles = StyleSheet.create({
  slideInLeft: {
    animationName: slideInLeft,
    animationDuration: '2s'
  },
  slideInRight: {
    animationName: slideInRight,
    animationDuration: '2s'
  }
})

/*======================================================================
// This is the main container for the app.
======================================================================*/
class App extends Component {
  /*======================================================================
  // This constructor will store the state of the longest found string,
  // all available prefix strings, a boolean state that determines whether
  // or not to display the results div or an error message, and the 
  // user's entered string that is updated on change.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      longestString: '',
      prefixStrings: ['abc', 'abcd', 'abcdde'],
      showError: false,
      showResult: false,
      userStringAdd: '',
      userStringMatch: '',
    };
  }

  /*======================================================================
  // This function updates the value of userString as the user enters
  // text into the input field. The result div will be hidden upon
  // entering new text. A reset of longestString will happen if a search
  // has previously occurred.
  ======================================================================*/
  handleStringAddChange (e) {
    this.setState({
      userStringAdd: e.target.value,
    })
    return;
  }

  /*======================================================================
  // This function will push the user's entered string into
  // this.state.prefixStrings, adding additional items to be evaluated
  // during findLongestPrefix();
  ======================================================================*/
  handleStringAdd (e) {
    this.state.prefixStrings.push(this.state.userStringAdd);
    this.setState({
      showResult: false,
    })
    return;
  }

  /*======================================================================
  // This function updates the value of userString as the user enters
  // text into the input field. The result div will be hidden upon
  // entering new text. A reset of longestString will happen if a search
  // has previously occurred.
  ======================================================================*/
  handleStringInputChange (e) {
    if(this.state.longestString.length > 0) {
      this.setState({
        longestString: '',
        showResult: false,
        userStringMatch: e.target.value,
      })
    } else {
        this.setState({
        showResult: false,
        userStringMatch: e.target.value,
      })
    }
    return;
  }

  /*======================================================================
  // Upon the user clicking the "Find Longest Prefix" button, this will
  // determine the string with the longest matching prefix. winningString
  // holds the currently longest string as each comparison occurs,
  // and once every string in the prefixStrings array has been evaluated,
  // winningString becomes this.state.longestString.
  ======================================================================*/
  findLongestPrefix (e) {

    let winningString = '';

    if (this.state.userStringMatch.length < 1){
      return;
    } else {
        this.state.prefixStrings.forEach((stringItem, index, arr) => {
          if ((this.state.userStringMatch.startsWith(stringItem)) && (stringItem.length > this.state.longestString)) {
            winningString = stringItem;
          }
        })
    }

    if (winningString.length < 1) {
      this.setState({
        longestString: 'No match was found!',
        showResult: true,
      })
      return;
    } else {
      this.setState({
        longestString: winningString,
        showResult: true,
      })
      return;
    }
  }

  /*======================================================================
  // In this render method we will display header text, a list of all
  // prefix strings stored in state, allow a user to enter a string,
  // and then view the longest string result, as well as a simple footer.
  // list-strings-div and user-string-div are animated upon page load.
  ======================================================================*/
  render() {
    return (
      <div className="app">
        <h2 className="header">Longest Prefix Challenge</h2>
        <div className={["list-strings-div", css(styles.slideInRight)].join(' ')}>
          <h3>List of Strings</h3>
            {this.state.prefixStrings.map((listString) => {
              return <p className="list-string">{listString}</p>
            })}
          <input className="user-string-add-input" type="text" name="user-string" placeholder="Enter a string to add" value={this.state.userStringAdd} onChange={this.handleStringAddChange.bind(this)} />
          <button className="user-string-add-button" onClick={this.handleStringAdd.bind(this)}>Add String</button>
        </div>
        <div className={["user-string-div", css(styles.slideInLeft)].join(' ')}>
          <input className="user-string-input" type="text" name="user-string" placeholder="Enter a string to match" value={this.state.userStringMatch} onChange={this.handleStringInputChange.bind(this)} />
          <button className="user-string-button" onClick={this.findLongestPrefix.bind(this)}>Find Longest Prefix</button>
        {(this.state.showResult)
            ? <div className="results"><h3>Longest Matching String</h3><p>{this.state.longestString}</p></div>
            : <div className="results-empty"></div> }
        </div>
        <footer className="footer">Made by <a href="http://www.jonathanleack.com/" target="_blank" rel="noopener noreferrer">Jonathan Leack</a></footer>
      </div>
    );
  }
}

export default App;
