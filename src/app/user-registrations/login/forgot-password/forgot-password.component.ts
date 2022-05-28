import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

import { ConfirmedValidator } from '../../../common/confirmed.validator';
import { RsaService } from '../../../common/Encryption.service';
import { IUser } from '../../IUser';

//import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  users: any;
  forgotForm: FormGroup;
  //constructor(private fb: FormBuilder, private router: Router) { }
  constructor(private fb: FormBuilder,private router: Router, private apiService: ApiService, private rsaService: RsaService) {
    this.apiService.getUser().subscribe((users) => {
      this.users = users;
    })
  }

  ngOnInit() {
    const current = window.sessionStorage.getItem('current');
    this.forgotForm = this.fb.group({
      username: [current, [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\-]{4,30}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\#\.\$]{4,30}')]],
      confirmPassword: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    }, { validator: ConfirmedValidator('password', 'confirmPassword') });
  }

  public get f() { return this.forgotForm.controls; }

  onSubmit() {
    if (!this.forgotForm.valid) {
      this.forgotForm.get('username').markAsDirty();
      this.forgotForm.get('password').markAsDirty();
      this.forgotForm.get('confirmPassword').markAsDirty();
      return;
    } else {
      const currentUser = this.forgotForm.value;
      let user: IUser = this.users.find(user => user.username === window.sessionStorage.getItem('current') || user.email === window.sessionStorage.getItem('current'));
      user.password = this.rsaService.encrypt(currentUser.password);
      this.apiService.updateUser(user, user.id).subscribe(() => {
        window.sessionStorage.removeItem('current');
        alert('Password changed successfully');
        this.router.navigate(['/login']);
      });
    }
  }

  authenticateUser(valid) {
    this.forgotForm.get('captcha').setValue(valid ? 'valid' : '');
  }
}
