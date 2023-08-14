//@ts-nocheck
import React, {useState} from 'react';
import Login from './components/Login';
import Home from './pages/home';
import Regist from './pages/regist';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Navigate
} from 'react-router-dom';

function App() {


    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login/>} />
                    <Route path='/home/*' element={<Home/>} />
                    <Route path='/regist' element={<Regist/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
