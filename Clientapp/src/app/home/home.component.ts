import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  textBoxValue = '0';
  calculatedValue = 0;
  selectedOperation = '';
  firstNumber = 0;
  secondNumber = 0;
  operationCompleted = true;
  subDisplayText:any=0;

  onClick(value, isOperator?: boolean): void {
    if (isOperator) {
      if (value === 'AC') {
        this.calculatedValue = 0;
        this.textBoxValue = '0';
        this.selectedOperation = '';
        this.firstNumber = 0;
        this.secondNumber = 0;
        this.operationCompleted = true;
        this.subDisplayText=this.subDisplayText;
      } else if (value === '=') {
        if (this.textBoxValue.includes('.')) {
          this.secondNumber = parseFloat(this.textBoxValue);
        } else {
          this.secondNumber = parseInt(this.textBoxValue, 10);
        }
        this.calculate(false);
        this.selectedOperation = '';
      } else {
        if (this.selectedOperation !== '') {
          if (this.textBoxValue.includes('.')) {
            this.secondNumber = parseFloat(this.textBoxValue);
          } else {
            this.secondNumber = parseInt(this.textBoxValue, 10);
          }
          this.calculate(true);
          this.textBoxValue = this.calculatedValue.toString();
          this.firstNumber = this.calculatedValue;
        } else {
          if (this.textBoxValue.includes('.')) {
            this.firstNumber = parseFloat(this.textBoxValue);
          } else {
            this.firstNumber = parseInt(this.textBoxValue, 10);
          }
          this.textBoxValue = value.toString();
        }
        this.selectedOperation = value;
      }
    } else {
      if ((this.textBoxValue === '0' || this.operationCompleted)) {
        if (value === '.') {
          value = '0.';
        }
        this.textBoxValue = value;
        this.calculatedValue = 0;
        this.operationCompleted = false;
      } else if (this.textBoxValue.length < 9) {
        if ((this.textBoxValue.includes('.') && value === '.')) {
          return;
        }
        if (this.textBoxValue.charCodeAt(0) >= 48 && this.textBoxValue.charCodeAt(0) <= 57 ) {
          this.textBoxValue += value.toString();
        } else {
          this.textBoxValue = value.toString();
        }
      }
    }
  }

  calculate(isInprogress = false) {
    switch (this.selectedOperation) {
      case '+': this.calculatedValue = this.firstNumber + this.secondNumber;
      this.subDisplayText = `${this.firstNumber} + ${this.secondNumber}`;
        break;
      case '-': this.calculatedValue = this.firstNumber - this.secondNumber;
      this.subDisplayText = `${this.subDisplayText} - ${this.secondNumber}`;
        break;
      case 'x': this.calculatedValue = this.firstNumber * this.secondNumber;
        break;
      case '/':
        if (this.firstNumber.toString().includes('.') || this.secondNumber.toString().includes('.')) {
          const result = (this.firstNumber / this.secondNumber);
          const decimals = 9 - (Math.round(result).toString().length);
          this.calculatedValue = parseFloat(result.toFixed(decimals));
        } else {
          this.calculatedValue = Math.round(this.firstNumber / this.secondNumber);
        }
        break;
    }
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.textBoxValue = this.calculatedValue.toString();
    this.calculatedValue = isInprogress ? this.calculatedValue : 0;
    this.operationCompleted = true;
  }

  isNumber(evt  ) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode === 47)) {
      return false;
    }
    if (this.textBoxValue.includes('.') && charCode === 46) {
      return false;
    }
    if (this.textBoxValue === '0') {
      this.textBoxValue = '';
    }
    return true;
  }

  PosEnd(end) {
    const len = end.value.length;

    // Mostly for Web Browsers
    if (end.setSelectionRange) {
      end.focus();
      end.setSelectionRange(len, len);
    } else if (end.createTextRange) {
      const t = end.createTextRange();
      t.collapse(true);
      t.moveEnd('character', len);
      t.moveStart('character', len);
      t.select();
    }
  }
}
