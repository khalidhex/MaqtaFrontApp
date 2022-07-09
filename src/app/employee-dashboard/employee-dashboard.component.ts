import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup; 
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: Boolean;

  constructor(private formbuilder :FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Name : [''],
      Department : ['']
    })

    this.getAllEmployee();
  }

  clickAddEmployee(){

    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate = false;

  }

  

  postEmployeeDetails(){
    this.employeeModelObj.Id = 0;
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Department = this.formValue.value.Department;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err =>{
      alert("Somthing Went Wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployees()
    .subscribe(res=>{
      this.employeeData = res;
     
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd= false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formValue.controls['Name'].setValue(row.name);
    this.formValue.controls['Department'].setValue(row.department);
  }

  updateEmployeeDetails(){
  
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Department = this.formValue.value.Department;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.Id)
    .subscribe(res =>{
      alert("Employee Data Updated");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
