import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    teams: []
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ teams: res }))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/v1/teams');
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Users</h1>
        {this.state.teams.map(team =>
          <div key={team._id}>{team.name}</div>
        )}
      </div>
    );
  }
}

export default App;
