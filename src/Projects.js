import React, { Component } from "react";
import { Variables } from "./variable.js";
export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      departments: [],
      modalTitle: "",
      pnum: 0,
      pname: "",
      city: "",
      DepartmentId: "",
      DepartmentName: "",
      employee_count: 0,
      error:null,
    };
  }
  //refresh both departments and employees array
  refreshList() {
    fetch(Variables.API_URL + "TheProjects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data });
      }).catch(error=>{
        this.setState({error:"Failed to fetch projects"});
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

  changeProjectName = (e) => {
    this.setState({ pname: e.target.value });
  };
  changeDepartment = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };
  changeProjectCity = (e) => {
    this.setState({ city: e.target.value });
  };
  addClick() {
    this.setState({
      modalTitle: "Add Project",
      pnum: 0,
      pname: "",
      city: "",
      DepartmentName: "",
    });
  }
  editClick(prog) {
    this.setState({
      modalTitle: "Edit Project",
      pnum: prog.pnum,
      pname: prog.pname,
      city: prog.city,
      DepartmentName: prog.DepartmentName,
    });
  }
  updateClick() {
    fetch(Variables.API_URL + "TheProjects", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pnum: this.state.pnum,
        pname: this.state.pname,
        city: this.state.city,
        DepartmentName: this.state.DepartmentName,
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
  createClick() {
    const{pname,city,DepartmentName}=this.state
    if(!pname||!city||!DepartmentName)
    {
      this.setState({error:"please enter all data"});
      alert("please enter all data");
      return;
    }
    fetch(Variables.API_URL + "TheProjects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pname,
        city,
        DepartmentName
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
      fetch(Variables.API_URL + "TheProjects/" + id, {
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
  render() {
    const {
      projects,
      departments,
      modalTitle,
      pnum,
      pname,
      city,
      employee_count,
    } = this.state;

    return (
      <div className="container">
        <h1 className="text-center mt-5 mb-4 .heading"> Projects Data</h1>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.addClick()}
          >
            Add Project
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>ProjectName</th>
              <th>city</th>
              <th>Department Name</th>
              <th>Count</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((prog) => (
              <tr key={prog.pnum}>
                <td>{prog.pnum}</td>
                <td>{prog.pname}</td>
                <td>{prog.city}</td>
                <td>{prog.DepartmentName}</td>
                <td>{prog.employee_count}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(prog)}
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
                    onClick={() => this.deleteClick(prog.pnum)}
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
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <label htmlFor="projectName" className="form-label">
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      value={pname}
                      onChange={this.changeProjectName}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={this.changeProjectCity}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                      Department
                    </label>
                    <select
                      className="form-select"
                      id="department"
                      onChange={this.changeDepartment}
                      value={this.state.DepartmentName}
                    >  <option value="">Select Department</option> {/* Add this line */}

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

                  {pnum === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.createClick()}
                    >
                      Create
                    </button>
                  ) : null}
                  {pnum !== 0 ? (
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
      </div>
    );
  }
}
