import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //Employee Model class instance
  formData: Employee

  //List of Employee Class instances to display all the employees
  list: Employee[];

  //Define the rootURL of the ASP.NET Web API where all the REST services are defined.
  readonly rootURL ='https://localhost:44389/api'

  constructor(private http: HttpClient) { }

  //This creates a HTTP POST request
  postEmployee(formData: Employee){
    return this.http.post(this.rootURL+'/Employee',formData)
  }

  //To display the retrieved list of employees.
  refreshList(){
    //This will call GetEmployees HTTP GET request and the retrieved list is typecasted into Employee datatype.
    this.http.get(this.rootURL+'/Employee').toPromise().then(res => this.list = res as Employee[]);
  }

  //This will call PutEmployee HTTP PUT request by providing the EmployeeID and updated employee details.
  putEmployee(formData: Employee){
    return this.http.put(this.rootURL+'/Employee/'+formData.EmployeeID,formData)
  }

  //This will call DeleteEmployee HTTP delete request by providing the EmployeeID
  deleteEmployee(id: number){
    return this.http.delete(this.rootURL+'/Employee/'+id);
  }
}
