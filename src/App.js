import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const cupIcon = <FontAwesomeIcon icon={faTrophy} />
  const [flashMessage, setFlashMessage] = useState();
  const [origin, setOrigin] = useState();

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <span>{cupIcon}</span>
        </div>

        <div className="name">
          <h1>MOTOCROSS CUP</h1>
        </div>
      </div>

      <div className="main">
        <Outlet context={[[flashMessage, setFlashMessage], [origin, setOrigin]]} />
      </div>

      <div className="footer">
        <span>Andres Arango | &copy; 2023</span>
      </div>
    </div>
  );
}

export default App;
