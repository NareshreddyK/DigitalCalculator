import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class AddAppointmentComponent implements OnInit {

  form: FormGroup;
  minDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.fb.group({
      treatment: ['',[Validators.required]],
      treatmentDate: ['',[Validators.required]],
      time: ['',[Validators.required]],
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z]{4,30}')]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      status: ['',[Validators.required]]
    });
  }

  Add() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.f.treatment.markAsTouched();
      this.f.treatmentDate.markAsTouched();
      this.f.time.markAsTouched();
      this.f.name.markAsTouched();
      this.f.email.markAsTouched();
      this.f.phone.markAsTouched();
      this.f.status.markAsTouched();
    }
  }

}
