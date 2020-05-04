import React from 'react';
import logo from './logo.svg';
import './App.css';
import { unregister, postMessage } from './subscription';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <RequestingButton />
          <PostMessageButton />
          <UnregisterButton />
        </div>
      </header>
    </div>
  );
}

function RequestingButton(): JSX.Element {
  function handleClick(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/`, { method: 'GET' });
  }
  return <button onClick={handleClick}>Requesting</button>;
}

function PostMessageButton(): JSX.Element {
  function handleClick(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    postMessage();
  }
  return <button onClick={handleClick}>PostMessage</button>;
}

function UnregisterButton(): JSX.Element {
  function handleClick(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    unregister();
  }
  return <button onClick={handleClick}>Unregister</button>;
}

export default App;
