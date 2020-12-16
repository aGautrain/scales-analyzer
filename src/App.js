import logo from './logo.svg';
import './App.css';
import { generateAll12Scales, majorScalePattern } from './scales';

function App() {


  const scales = generateAll12Scales(majorScalePattern);
  console.info(scales);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
