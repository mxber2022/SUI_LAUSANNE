import './App.css';
import Nav from './components/Nav/Nav';
import Mint from './components/Mint/Mint';
import Revive from './components/Revive/Revive';

function App() {
  return (
    <div className="App">
      <>
        <Nav/>
        <Revive/>
        <Mint/>
      </>
    </div>
  );
}

export default App;
