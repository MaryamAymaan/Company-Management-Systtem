import React, { Component } from "react";
import { Variables } from "./variable.js";
import "./Tables.css";
export class Statistcs extends Component {
    constructor(props) {
        super(props);
        this.state = {
              stat:{},
              EmployeeCount:0
           // AverageEmployees:0,
            //TotalNumberOfDepartments:0,
            //projectsNumber:0,
            //AllStat:[]
   
        };
      }
      refreshList() {
        fetch(Variables.API_URL + "Statistcs")
          .then((response) => response.json())
          .then((data) => {
                   this.setState({stat:data})
          }
            ).catch(error=>{
            this.setState({error:"Failed to fetch data"});
            console.error(error);
          });
      
      }

      componentDidMount(){
        this.refreshList();
      }
      render(){
        const{
            stat,
            EmployeeCount
        }=this.state
        return(
            <div className="container">
            <h1 className="text-center mt-5 mb-4 .heading"> Departemnts Data</h1>
          
               <h3>Statistcs</h3>
               <p>{stat.EmployeeCount}</p>
    
               </div>
               
        )
      };

}
