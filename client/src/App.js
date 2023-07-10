import {BrowserRouter, Routes, Route } from 'react-router-dom'; 

//import app pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';  


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registe' element={<Register />} />
        <Route path='/dashboar' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
