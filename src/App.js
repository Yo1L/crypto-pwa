import React, { Component } from 'react';
import './App.css';
import Today from './Today/Today'
import History from './History/History'

class App extends Component {
  render() {
    return (
      <div className="">
        <div className="topheader">
            <header className="container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <span className="navbar-item">PusherCoins</span>
                    </div>
                </nav>
            </header>
        </div>
        <section className="results--section">
            <div className="container">
                <h1>Realtime prices<br/></h1>
            </div>
            <div className="results--section__inner">
                <Today />
                <History />
            </div>
        </section>
      </div>
    );
  }
}

export default App;
