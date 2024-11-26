import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/Home';
import MailsPage from './pages/Mails';
import EmployeesPage from './pages/Employees';
import PersPage from './pages/Pers';
import BillingPage from './pages/Billing';
import ProjectsPage from './pages/Projects'
import NewEmployeePage from './pages/NewEmployee'
import Auth from './pages/Auth'
import PrivateRoute from './components/PrivateRoute';
  
const App = () => {
    return (
        <Router>
            <Main />
        </Router>
    );
};

const Main = () => {
    const location = useLocation();
    const showSidebar = location.pathname !== '/auth';

    return (
        <div className="App">
            {showSidebar && <Sidebar />}
            <div id="content" className="content">
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/mails" element={<PrivateRoute><MailsPage /></PrivateRoute>} />
                    <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
                    <Route path="/employees" element={<PrivateRoute><EmployeesPage /></PrivateRoute>} />
                    <Route path="/employees/new_employee" element={<PrivateRoute><NewEmployeePage /></PrivateRoute>} />
                    <Route path="/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
                    <Route path="/pers" element={<PrivateRoute><PersPage /></PrivateRoute>} />
                </Routes>
            </div>
        </div>
    );
};

window.onclick = function (event) {
    if (!event.target.matches('.dropdownButton')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

export default App;