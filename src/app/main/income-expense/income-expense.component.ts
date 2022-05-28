import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {

  @Input() itemList: any[] = [];
  @Input() listType: string = '';
  dataList = [];

  @Output() deleteItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  updateList() {
    this.dataList = this.itemList.filter(item => item.type === this.listType.toLowerCase());
  }
}
