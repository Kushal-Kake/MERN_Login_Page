import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Myprofile from './components/Myprofile';
export const store = createContext()
function App() {
  const [token, setToken] = useState(null)
  return (
    <store.Provider value={[token, setToken]}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myprofile' element={<Myprofile />} />
      </Routes>
    </BrowserRouter>
    </store.Provider>
  )
}

export default App;
