import './App.css';
import Cadastro from './components/Cadastro';
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/>
        <Cadastro/>
      </header>
    </div>
  );
}

export default App;
