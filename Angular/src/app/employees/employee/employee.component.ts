import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public service: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Reset the form on rendering the Employee component
    this.resetForm();
  }

  // Initialize the Employee Model instance - forData.
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      EmployeeID: null,
      FullName: '',
      Position: '',
      EMPCode: '',
      Mobile: ''
    }
  }

  /* Called on submiting the form. 
  If the form doesn't get an EmployeeID then the form data is inserted into database.
  Else the form data is updated based on provided EmployeeID
  */
  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  //This will insert the data into the database.
  insertRecord(form: NgForm) {
    //postEmployee service returns an observable which is subscribed to display a toast message on successful insertion of record.
    //The form is reset and the updated list is displayed.
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Inserted Successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    })
  }

  //This will update the records into the database.
  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated Successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    })
  }

}
