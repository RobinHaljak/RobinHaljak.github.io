import React from 'react';
import './App.css';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, React!</h1>
        <Greeting name="Alice" />
        <Greeting name="Bob" />
        <Greeting name="Yuan" />
      </header>
    </div>
  );
}

export default App;