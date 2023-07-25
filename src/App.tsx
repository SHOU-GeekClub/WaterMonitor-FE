import React, { useState } from 'react';
import Login from './components/Login';
import Home from './pages/home';
import { BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,  
  useNavigate,
  Navigate
} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    // <div>
    //   <Login />
    // </div>
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route  path='/home' element={<Home />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
