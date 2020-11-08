import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Page from './components/Page';
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

  // gets html file from server
  getData = async () => {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  // computes the title of the html file
  computeTitle = (html) => {
    const start = html.indexOf('//');
    const titleRaw = html.substr(0, start - 3);
    const title = titleRaw
      .replace(/[&\\#, +()$~%'":*?!@<>^{}]/g, '-')
      .toLowerCase();
    return title;
  };

  // removes the concatenated title of the file which was added on the server
  removeTitleFromFile = (response) => {
    return response.substring(response.indexOf('//') + 2, response.length);
  };

  render() {
    const title = this.computeTitle(this.state.responseToPost);
    return (
      <div className='App'>
        <Router>
          <div>
            <ul>
              <li>
                <Link to={`/blog/${title}`}>{title}</Link>
              </li>
            </ul>
            <Switch>
              <Route path={`/blog/${title}`}>
                <Page
                  data={this.removeTitleFromFile(this.state.responseToPost)}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
