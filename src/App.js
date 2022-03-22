import "./App.scss";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1 className="App-title">Warble</h1>
        <p className="App-subtitle">A Wordle remake, just for fun!</p>
      </div>
      <p>Type letters on your keyboard and press enter to sumbit</p>
      <Game />
    </div>
  );
}

export default App;
