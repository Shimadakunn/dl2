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
            <Route exact path="/dl" element={<Home/>} />
            <Route exact path="/dl/gallery" element={<Gallery/>} />
            <Route exact path="/dl/shoot" element={<Shoot/>} />
            <Route exact path="/dl/contact" element={<Contact/>} />
        </Routes>
    </Router>
);
}
export default App