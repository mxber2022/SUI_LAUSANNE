import './App.css';
import Nav from './components/Nav/Nav';
import Mint from './components/Mint/Mint';
import Revive from './components/Revive/Revive';
import GetAllProjects from './components/GetAllProjects/GetAllProjects';

function App() {
  return (
    <div className="App">
      <>
        <Nav/>
        <Revive/>
        <GetAllProjects/>
      </>
    </div>
  );
}

export default App;
