import React, { Component } from "react";
import { Variables } from "./variable.js";
import "./Tables.css";
export class Department extends Component {
  //1.Creating constructor and defining state variables
  constructor(props) {
    //call constructor of its parent class
    super(props);
    //defining an array for departments
    this.state = {
      departments: [],
      modalTitle: "",
      DepartmentName: "",
      DepartmentId: 0,
      Location: "",
      error:null,
    };
  }
  refreshList() {
    fetch(Variables.API_URL + "Department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data });
      })
      .catch(error=>{
        this.setState({error:"Failed to fetch departments"});
        console.error(error);
      });
  }
  componentDidMount() {
    this.refreshList();
  }
  changeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };
  changeDepartmentLocation = (e) => {
    this.setState({ Location: e.target.value });
  };
  addClick() {
    this.setState({
      modalTitle: "Add Department",
      DepartmentId: 0,
      DepartmentName: "",
      Location: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Department",
      DepartmentId: dep.DepartmentId,
      DepartmentName: dep.DepartmentName,
      Location: dep.Location,
    });
    localStorage.setItem("currentLocation", dep.Location);
  }
  createClick() {
    const{DepartmentName,Location}=this.state;
    //form validation
    if(!DepartmentName||!Location)
    {
      this.setState({error:"please enter department name and location"});
      alert("please enter department name and location");
      return;
    }
    fetch(Variables.API_URL + "Department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName,
        Location,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({isAddModalOpen:false})
          alert('Department created sucessflly');
          this.refreshList();
        })
        .catch(
        (error) => {
          this.setState({error:'Failed to create department'})
          console.error(error);
        });
  }
  updateClick() {
    const currentLocation = localStorage.getItem("currentLocation");
    fetch(Variables.API_URL + "department/" + currentLocation, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentId: this.state.DepartmentId,
        DepartmentName: this.state.DepartmentName,
        location: this.state.Location,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed to update ");
        }
      );
  }
  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(Variables.API_URL + "department/" + id, {
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
    //declare state variables to be able to use it inside HTML
    const { departments, modalTitle, DepartmentId, DepartmentName, Location } =
      this.state;
    return (
      <div className="container">
        <h1 className="text-center mt-5 mb-4 .heading"> Departemnts Data</h1>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.addClick()}
          >
            Add Department
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>DepartmentID</th>
              <th>DepartmentName</th>
              <th>DepartmentLocation</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>
                <td>{dep.Location}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)}
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
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(dep.DepartmentId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
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
                  arial-aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="row">
                    <div className="col-12">
                      <span className="input-group-text label">
                        DepartmentName
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={DepartmentName}
                        onChange={this.changeDepartmentName}
                      />
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-12 location">
                      <span className="input-group-text label">
                        DepartmentLocation
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={Location}
                        onChange={this.changeDepartmentLocation}
                      />
                    </div>
                  </div>
                </div>
                {DepartmentId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {DepartmentId !== 0 ? (
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
