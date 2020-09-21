import React, { Component } from 'react';
import './App.css';
class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.getData();
  }

  getData = async (e) => {
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  render() {
    return (
      <div className='App'>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;
