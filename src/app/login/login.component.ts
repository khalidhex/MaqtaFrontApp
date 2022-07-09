import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  public loginForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  login() {


    this.authService.login(this.loginForm.value)
      .subscribe((res: any) => {

        //if success
        if (res.token) {

          alert("Login Success");
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        }
        else {
          alert("User Not Found !");
        }

      }, (err: any) => {

        if (err.status === 401) {
          alert("User Not Found !");
        }
        else
          alert("Something went wrong !");
      })
  }

}
