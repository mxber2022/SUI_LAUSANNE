import './App.css';
import Nav from './components/Nav/Nav';
import Mint from './components/Mint/Mint';
import Revive from './components/Revive/Revive';
import GetAllProjects from './components/GetAllProjects/GetAllProjects';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <>
        <Nav/>
        <Header/>
        <Revive/>
        <GetAllProjects/>
        <Footer/>
      </>
    </div>
  );
}

export default App;
