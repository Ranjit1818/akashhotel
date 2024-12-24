import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import FooterComponent from './components/common/Footer';
import HomePage from './components/home/HomePage';
import RoomSearch from './components/common/RoomSearch';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <div className='content'>
        <Routes>
          <Route exact path='/home' element={<HomePage/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
        </Routes>
      </div>
      <FooterComponent/>
    </div>
    </BrowserRouter>
  );
}

export default App;
