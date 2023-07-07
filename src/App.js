import "./App.css";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from "./pages/Home";
import Register from "./components/accounts/Register";
import AdminHome from './pages/admin/AdminHome'
import TutorHome from "./pages/tutor/TutorHome";
import Course from './components/user side/course/Course'
import CourseDetail from './components/user side/course/CourseDetail'
import SingleCourse from "./components/user side/course/CourseDetail";
import Dashboard from "./components/admin/Dashboard";
import Student from "./components/admin/Student";
import Tutor from "./components/admin/Tutor";
import Categories from './components/admin/Categories'
import Courses from './components/admin/Courses'
import Dashboards from "./components/tutor/Dashboards";
import Coursetutor from './components/tutor/Coursetutor'
import CreateCourse from './components/tutor/CreateCourse'
import DetailedCourse from './components/admin/DetailedCourse'
import SingleCourses from "./components/admin/DetailedCourse";
import CategoryTutor from './components/tutor/CategoryTutor'
import CreateCategory from './components/tutor/CreateCategory'
import Tutorregister from './components/tutor/Tutorregister'
import LoginTutor from './components/tutor/LoginTutor'


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
          <Route path='/course' exact Component={Course} />
          <Route path='/coursedetail/:id' exact Component={SingleCourse} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/student' Component={Student} />
          <Route path='/tutor' Component={Tutor} />
          <Route path='/categories' Component={Categories} />
          <Route path='/courses' Component={Courses} />
          <Route path='/dashboards' Component={Dashboards} />
          <Route path='/coursetutor' Component={Coursetutor} />
          <Route path='/createcourse' Component={CreateCourse}/>   
          <Route path='/detailedcourse/:id' exact Component={SingleCourses}/>
          <Route path='/categorytutor' Component={CategoryTutor}/>
          <Route path='/createcategory' Component={CreateCategory}/>
          <Route path='/tutorsignup' Component={Tutorregister}/>
          <Route path='/tutorsignin' Component={LoginTutor}/>
          
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
