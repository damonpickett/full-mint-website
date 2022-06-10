import { useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';
import  Modal from './Modal';

function App() {

  const [accounts, setAccounts] = useState([]);
  const [modal, setModal] = useState(false)

  return (
    <div className='overlay'>
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <button className='instructions-button' onClick={() => {setModal(true)}}>Instructions</button>
        <Modal modal={modal} setModal={setModal} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className='moving-background'></div>
    </div>
  );
}

export default App;
