
import './App.css';
import Home from './pages/home/home';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate
} from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Profile from './pages/profile/profile';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

const {user}=useContext(AuthContext);


  return (
    <div>
    <Router>
      <Routes>
      <Route exact path="/" element={user? <Home />: <Login/>} />
          <Route path="/login" element={user? <Navigate to="/" />:<Login />} />
          <Route path="/register" element={user? <Navigate to="/" />:<Register />} />
          <Route path="/profile/:username" element={<Profile/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
