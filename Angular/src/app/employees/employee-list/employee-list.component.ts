import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    public service: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //The Employee list will always be displayed while rendering the Employee-list component.
    this.service.refreshList();
  }

  //The form is automatically populated with the employee details on selecting the employee.
  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  //This will delete the employee based on provided EmployeeID and the list is updated with a toast message.
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully', 'EMP. Register');
      })
    }
  }
}
