import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  ieform: FormGroup;
  @Output() itemEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.ieform = this.fb.group({
      amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(9), Validators.pattern('[0-9\-\.]{1,9}')]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]{3,}')]]
    });
  }

  Add() {
    if (!this.ieform.valid) {
      this.ieform.get('amount').markAsDirty();
      this.ieform.get('description').markAsDirty();
      return;
    }
    const data = this.ieform.value;
    data.type = data.amount < 0 ? 'expense' : 'income';
    this.itemEvent.emit(data);
    this.ieform.reset();
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 45 || charCode > 57) || charCode === 47)) {
      return false;
    }
    if (this.ieform.controls.amount.value !== null && this.ieform.controls.amount.value.includes('.') && charCode === 46) {
      return false;
    }
    return true;
  }

}
