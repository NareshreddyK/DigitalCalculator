import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { ConfirmedValidator } from '../common/confirmed.validator';
import { RsaService } from '../common/Encryption.service';
import { IUser } from './IUser';

@Component({
  selector: 'app-user-registrations',
  templateUrl: './user-registrations.component.html',
  styleUrls: ['./user-registrations.component.css']
})
export class UserRegistrationsComponent implements OnInit {

  users: any;
  registerForm: FormGroup;
  newId: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private rsaService: RsaService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]{4,20}')]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\-]{4,30}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\@\#\.\$]{4,30}')]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    }, { validator: ConfirmedValidator('password', 'confirmPassword') });

    this.apiService.getUser().subscribe(users => {
      this.users = users;
      this.newId = this.getNextId(users);
    })
  }

  isUsernameUnique(username): boolean{
    return this.users.filter(u => u.username === username).length == 0;
  }

  isEmailUnique(email): boolean{
    return this.users.filter(u => u.email === email).length == 0;
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
  public get f() { return this.registerForm.controls; }

  getNextId(obj) {
    return (Math.max.apply(Math, obj.map((o) => {
      return o.id;
    })) + 1);
  }

  save() {
    if (this.registerForm.valid) {
      const user: IUser = this.registerForm.value;
      if (this.isUsernameUnique(user.username) || this.isEmailUnique(user.emailId)) {
        user.id = this.newId;
        user.password = this.rsaService.encrypt(user.password);
        //this.jsonData.users.push(this.registerForm.value);
        this.apiService.saveUser(user).subscribe(
          (data) => {
            alert(data.username + " added succesfully!!");
            this.router.navigate(['/login'])
          },
          (err) => { console.error(err); },
          () => { }
        );
      } else {
        alert('UserName or email already exists');
      }
    } else {
      this.registerForm.get('name').markAsDirty();
      this.registerForm.get('username').markAsDirty();
      this.registerForm.get('password').markAsDirty();
      this.registerForm.get('confirmPassword').markAsDirty();
      this.registerForm.get('mobileNumber').markAsDirty();
      this.registerForm.get('email').markAsDirty();
      return;
    }
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

}
