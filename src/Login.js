import React, { Component } from 'react';
import { Variables } from './variable.js';
import { BrowserRouter as Router, Route, Navigate} from 'react-router-dom';
import './Login.css'; // Create a separate CSS file for custom styles
import { Employee } from './Employee.js';
import{Projects} from'./Projects'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      EmployeeName: "",
      Managerpass: "",
      message: "" // Add a state to store the message from the backend
    };
  }

  handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    this.setState({ loggedIn: true });
    fetch(Variables.API_URL + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EmployeeName: this.state.EmployeeName,
        Managerpass: this.state.Managerpass
      })
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({ message: result }); // Store the message in the state
      }, (error) => {
        alert('Failed');
      });
  }

  changeUser = (e) => {
    this.setState({ EmployeeName: e.target.value });
  }

  changePass = (e) => {
    this.setState({ Managerpass: e.target.value });
  };
  render() {
    return (
      <div className="login-wrapper">
        <h2 className="login-heading">Login for Managers</h2>
        {!this.state.loggedIn ? ( // Render login form if not logged in
          <form className="login-form" onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" value={this.state.EmployeeName} onChange={this.changeUser} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.Managerpass} onChange={this.changePass} />            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        ) : (
          // Render the Employee component if logged in
          this.state.message === "User is valid" ? (
            <Navigate to="/Projects" />
          ) : (
            <div>
              <p>{this.state.message}</p>
              <button className="btn-block"onClick={() => this.setState({ loggedIn: false })}>Back to Login</button>
            </div>
          )
        )}
      </div>
      
    );
  }
}