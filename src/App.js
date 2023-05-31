import "./App.css";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from "./pages/Home";
import Register from "./components/accounts/Register";
import AdminHome from './pages/admin side/AdminHome'
import TutorHome from "./pages/tutor side/TutorHome";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/adminhome' exact Component={AdminHome} />
          <Route path='/tutorhome' exact Component={TutorHome} />

        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
