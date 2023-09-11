import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React,{ useEffect } from 'react'
import Home from './Pages/Home'
import Gallery from './Pages/Gallery'
import Contact from './Pages/Contact'
import Shoot from './Pages/Shoots/Shoot1'

import Mouse from './Components/Mouse'
import Logo from './Components/Logo'
import Menu from './Components/Menu'

function App() {
return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Mouse/>
        <Logo/>
        <Menu/>
        <Routes>
            <Route exact path="" element={<Home/>} />
            <Route exact path="/gallery" element={<Gallery/>} />
            <Route exact path="/shoot" element={<Shoot/>} />
            <Route exact path="/contact" element={<Contact/>} />
        </Routes>
    </Router>
);
}
export default App