import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetails: FormGroup;
  userData = {
    id: 8,
    firstName: 'ABC',
    lastName: 'DEF',
    gender: 'male',
    phoneNumber: '9876543210',
    address: 'xyz'
  };

  isFirstNameEdited = false;
  islastNameEdited = false;
  isGenderEdited = false;
  isPhonenumberEdited = false;
  isAddressEdited = false;
  enableSave = false;
  validations = {
    firstName: false,
    lastName: false,
    gender: false,
    phoneNumber: false,
    address: false
  };

  constructor(private fb: FormBuilder) { }

  public get f() { return this.userDetails.controls; }

  ngOnInit() {
    this.userDetails = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required]],
      lastName: [this.userData.lastName, [Validators.required]],
      gender: [this.userData.gender, [Validators.required]],
      phoneNumber: [this.userData.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      address: [this.userData.address, [Validators.required]]
    })
  }
  validate(fieldName: string, isBlur: boolean = false): void {
    if (this.userDetails.valid && this.userData[fieldName] !== this.userDetails.get(fieldName)) {
      this.enableSave = true;
      this.validations[fieldName] = !isBlur ? true : false;
    } else {
      this.userDetails.get('firstName').markAsDirty();
      this.userDetails.get('lastName').markAsDirty();
      this.userDetails.get('gender').markAsDirty();
      this.userDetails.get('phoneNumber').markAsDirty();
      this.userDetails.get('address').markAsDirty();
      return;
    }
  }

  edit(fieldName: string) {
    this.validations[fieldName] = true;
  }

  Save() {
    if (this.userDetails.valid) {
      Object.assign(this.userData, this.userDetails.value);
      this.enableSave = false;
    } else {
      this.userDetails.get('firstName').markAsDirty();
      this.userDetails.get('lastName').markAsDirty();
      this.userDetails.get('gender').markAsDirty();
      this.userDetails.get('phoneNumber').markAsDirty();
      this.userDetails.get('address').markAsDirty();
      return;
    }
  }

}
