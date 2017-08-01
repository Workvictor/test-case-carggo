import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import ContentTable from './components/contentTable';


class App extends Component {
  constructor() {
    super();

    this.state = {
      scrollEnd: 0
    }
  }
  componentDidMount = () => {
    document.addEventListener('scroll', this.onScroll);
    this.setState({
      scrollEnd: document.body.offsetHeight - window.innerHeight
    });
  }
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.onScroll);
  }

  loadContent = () => {
    this.props.onLoadContent();
  }

  onScroll = (event) => {
    if (document.body.scrollTop >= this.state.scrollEnd) {
      this.loadContent();
      this.setState({
        scrollEnd: document.body.offsetHeight - window.innerHeight
      });
    }
  }
  
  render() {    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Carggo test case. Infinity loop</h2>
          <h3>by Victor Punko</h3>
        </div>
          <p>Данные будут подгружаться при прокрутке страницы.</p>
        <ContentTable testTable={this.props.testTable} />
      </div>
    );
  }
}

export default connect(
  state => ({
    testTable: state
  }),
  dispatch => ({
    onLoadContent: () => {
      dispatch({
        type: "ADD_CONTENT"
      })
    }
  })
)(App);
