import "./App.css";
import { Department } from "./Department";
import { Employee } from "./Employee";
import { Login } from "./Login";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { useState } from "react";
import { Projects } from "./Projects";
import{Statistcs}from "./Statistcs"

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="background-image">
          <nav className="navbar navbar-expand-lg navbar-light bg-info fixed-top">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNav}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${
                isNavOpen ? "show" : "hide" // Added 'hide' class when isNavOpen is false
              }`}
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item m-1">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/department"
                    onClick={toggleNav}
                  >
                    Department
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/Employee"
                    onClick={toggleNav}
                  >
                    Employee
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/Login"
                    onClick={toggleNav}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/Statistcs"
                    onClick={toggleNav}
                  >
                    Statistcs
                  </NavLink>
                </li>
                <NavLink className="navbar-brand title" to="/Home">
                  Company Management System
                </NavLink>
              </ul>
            </div>
          </nav>
        </div>

        <div className="content">
          <Routes>
            <Route path="/Department" element={<Department />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Statistcs" element={<Statistcs />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
