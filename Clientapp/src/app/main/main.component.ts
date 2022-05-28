import { Component, OnInit, ViewChild } from '@angular/core';

import { IncomeExpenseComponent } from './income-expense/income-expense.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  incomeExpenseList: any[] = [];
  total: number = 0;
  @ViewChild('incomeList', { static: true }) incomeCal: IncomeExpenseComponent;
  @ViewChild('expenseList', { static: true }) expenseCal: IncomeExpenseComponent;

  ngOnInit() {
  }

  receiveData(data) {
    this.incomeExpenseList.push(data);
    this.total += parseInt(data.amount);
    if (data.amount > 0) {
      this.incomeCal.updateList();
    } else {
      this.expenseCal.updateList();
    }

  }

  delete(item) {
    this.incomeExpenseList = this.incomeExpenseList.filter(i => i.description !== item.description);
  }
}
