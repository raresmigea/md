import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

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

  computeTitle = (html) => {
    const start = html.indexOf('"');
    const end = html.indexOf('</p>');
    const titleRaw = html.substr(start + 1, end - 19);
    const title = titleRaw
      .replace(/[&\/\\#, +()$~%'":*?<>{}]/g, '-')
      .toLowerCase();
    console.log('title: ', title);
    console.log('html: ', html);
    return title;
  };

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
    const title = this.computeTitle(this.state.responseToPost);
    return (
      <div className='App'>
        <Router>
          <div>
            <Switch>
              <Route path={`/blog/${title}`}>
                <Page data={this.state.responseToPost} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
