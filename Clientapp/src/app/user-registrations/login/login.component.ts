import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

import { RsaService } from '../../common/Encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private rsaService: RsaService) {
    this.apiService.getUser().subscribe((users) => {
      this.users = users;
    })
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\-]{4,30}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\#\.\$]{4,30}')]],
      captcha: ['', [Validators.required]]
    });
  }

  public get f() { return this.loginForm.controls; }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.get('username').markAsDirty();
      this.loginForm.get('password').markAsDirty();
      return;
    } else {
      const currentUser = this.loginForm.value;
      const user = this.users.find(u => u.email === currentUser.username || u.username === currentUser.username);
      const password = this.rsaService.decrypt(user.password);
      if (user && password === currentUser.password) {
        alert('Login successful');
        this.router.navigate(['/user-data']);
      } else {
        alert('Login failed, Invalid username or password');
      }
    }
  }

  authenticateUser(valid) {
    this.loginForm.get('captcha').setValue(valid ? 'valid' : '');
  }

  validateUser() {
    if (this.loginForm.get('username').value) {
      const user = this.users.find(u => u.email === this.loginForm.get('username').value || u.username === this.loginForm.get('username').value);
      if (user) {
        window.sessionStorage.setItem('current', user.username);
        this.router.navigate(['/forgot']);
      }
      else {
        alert('Invalid username');
      }
    } else {
      alert('Enter valid username');
    }
  }

  registrationForm() {
    this.router.navigate(['/register']);
  }

}
