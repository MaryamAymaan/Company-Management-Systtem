import React, { Component } from "react";
import { Variables } from "./variable.js";
import "./Tables.css";
export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      employees: [],
      modalTitle: "",
      EmployeeId: 0,
      EmployeeName: "",
      DepartmentName: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png",
      PhotoPath: Variables.PHOTO_URL,
      error:null,
    };
  }
  //refresh both departments and employees array
  refreshList() {
    fetch(Variables.API_URL + "Employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      }).catch(error=>{
        this.setState({error:"Failed to fetch employees"});
        console.error(error);
      });
    fetch(Variables.API_URL + "Department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data });
      }).catch(error=>{
        this.setState({error:"Failed to fetch departments"});
        console.error(error);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEmployeeName = (e) => {
    this.setState({ EmployeeName: e.target.value });
  };
  changeDepartment = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };
  changeDateOfJoining = (e) => {
    this.setState({ DateOfJoining: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      EmployeeId: 0,
      EmployeeName: "",
      DepartmentName: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png",
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Edit Employee",
      EmployeeId: emp.EmployeeId,
      EmployeeName: emp.EmployeeName,
      DepartmentName: emp.DepartmentName,
      DateOfJoining: emp.DateOfJoining,
      PhotoFileName: emp.PhotoFileName,
    });
  }

  createClick() {
    const{EmployeeName,DepartmentName,DateOfJoining, PhotoFileName}=this.state
    if(!EmployeeName||!DepartmentName||!DateOfJoining||!PhotoFileName)
    {
      this.setState({error:"please enter all data"});
      alert("please enter all data");
      return;
    }
    fetch(Variables.API_URL + "Employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeName,
        DepartmentName,
        DateOfJoining,
        PhotoFileName
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Employee Created succesfully");
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(Variables.API_URL + "Employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: this.state.EmployeeId,
        EmployeeName: this.state.EmployeeName,
        DepartmentName: this.state.DepartmentName,
        DateOfJoining: this.state.DateOfJoining,
        PhotoFileName: this.state.PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(Variables.API_URL + "Employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }
  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(Variables.API_URL + "employee/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ PhotoFileName: data });
      });
  };

  render() {
    const {
      departments,
      employees,
      modalTitle,
      EmployeeId,
      EmployeeName,
      DepartmentName,
      DateOfJoining,
      PhotoPath,
      PhotoFileName,
    } = this.state;

    return (
      <div className="container">
        <h1 className="text-center mt-5 mb-4 .heading"> Employee Data</h1>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.addClick()}
          >
            Add Employee
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Department Name</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.DepartmentName}</td>
                <td>{emp.DateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.EmployeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Emp Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={EmployeeName}
                        onChange={this.changeEmployeeName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Department</span>
                      <select
                        className="form-select"
                        onChange={this.changeDepartment}
                        value={DepartmentName}
                      >
                          <option value="">Select Department</option> {/* Add this line */}

                        {departments
                          .filter(
                            (dep, index, self) =>
                              self.findIndex(
                                (d) => d.DepartmentName === dep.DepartmentName
                              ) === index
                          )
                          .map((dep) => (
                            <option key={dep.DepartmentId}>
                              {dep.DepartmentName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">DOJ</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOfJoining}
                        onChange={this.changeDateOfJoining}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + PhotoFileName}
                      alt="Employee Image" 
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>

                {EmployeeId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {EmployeeId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
