import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  employeeDetails: Employee ={
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary:0,
    department:''
  };

  constructor(private route: ActivatedRoute, private employeeServices: EmployeesService, private router: Router ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id');

        if(id){
          this.employeeServices.getEmployee(id)
          .subscribe({
            next:(response) =>{
              this.employeeDetails = response;
            }
          })
        }
      }
    })
    

  }

  updateEmployee(){
    this.employeeServices.updateEmployee(this.employeeDetails.id, this.employeeDetails)
    .subscribe({
      next: (response)=>{
        this.router.navigate(['employees']);
      }
    })
  }

  deleteEmployee(id: string){
    this.employeeServices.deleteEmployee(id)
    .subscribe({
      next: (response)=> {
        this.router.navigate(['employees']);
      }
    });
  }

}

