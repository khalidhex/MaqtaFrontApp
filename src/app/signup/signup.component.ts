import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup
  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router:Router) { 

  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

      UserName:['',Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required]
    })
  }

  signUp(){

    this.http.post<any>("https://localhost:7085/api/Authenticate/register",this.signupForm.value)
    .subscribe(res =>{
      alert("SignUp Successfull");
      console.log(res);
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err =>{
      
      alert("Something went wrong");

    })
  }

}
