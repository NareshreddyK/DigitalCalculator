import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common/common.service';
import { IAppointment } from 'src/app/IAppointment';

import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() forDays: number = 1;
  @Input() appointmentList: IAppointment[] = [];
  @Output() onListChange = new EventEmitter<any>();
  @Output() onListUpdate = new EventEmitter<any>();

  //const data = appointmentList.filter(x => this.getFormatedDate(x.))
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'treatment', 'date', 'status'];
  clickedRows = new Set<IAppointment>();
  fromDate: Date = new Date();
  endDate: Date = new Date();

  constructor(public dialog: MatDialog, private commonService: CommonService) {
    const currentDate = new Date(this.commonService.getFormatedDate(new Date(), 'yyyy-MM-dd'));
    this.fromDate = new Date(currentDate.getTime());
    this.fromDate.setHours(0, 0, 0, 0);
    this.endDate = new Date(this.fromDate.getTime() + (1000 * 60 * 60 * 24));
    this.dataSource = new MatTableDataSource<IAppointment>(this.appointmentList);
  }

  ngOnInit() {
    this.filterData();
  }

  filterData() {
    let list = this.appointmentList;
    if (this.forDays === 1) {
      list = this.appointmentList.filter(x => this.commonService.getDate(x.date) >= this.endDate);
    } else if (this.forDays === 0) {
      list = this.appointmentList.filter(x => this.commonService.getDate(x.date) >= this.fromDate && this.commonService.getDate(x.date) < this.endDate);
    } else if (this.forDays === -1) {
      list = this.appointmentList.filter(x => this.commonService.getDate(x.date) < this.fromDate);
    }
    this.dataSource = new MatTableDataSource<IAppointment>(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDate(stringDate: string) {
    return this.commonService.getDate(stringDate);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '400px',
      height: '98%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      const data: IAppointment = {
        id: this.getNextId(this.appointmentList),
        name: result.name,
        email: result.email,
        phone: result.phone,
        treatment: result.treatment,
        date: this.commonService.getFormatedDate(result.treatmentDate, 'MMMM dd, yyyy') + ' ' + result.time + ':00',
        status: result.status
      };
      this.onListChange.emit({ appointmentData: data });
    });
  }

  updateStatus(id: number, event) {
    this.onListUpdate.emit({ id, status: event.value });
  }

  getNextId(obj) {
    return (Math.max.apply(Math, obj.map((o) => {
      return o.id;
    })) + 1);
  }

  isDateElapsed(stringDate: string) {
    return this.commonService.getDate(stringDate) < new Date();
  }

}

