import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  searchName = "";
  searchType = "name";
  orderBy = "asc";

  users=[{
    name:'test 1',
    last:'abc 1',
    age : '25'
  },{
    name:'user',
    last:'nagar',
    age : '30'
  },{
    name:'Admin',
    last:'test',
    age : '35'
  },{
    name:'user 5',
    last:'last User',
    age : '20'
  }];

  ngOnInit() {
  }


}
