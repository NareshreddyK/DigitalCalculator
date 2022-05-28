import { Component, OnInit, ViewChild } from '@angular/core';

import { IAppointment } from '../IAppointment';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointmentList: IAppointment[] = [
    { id: 1, name: 'John Doe', email: 'jdoe@example.com', phone: '997576557', treatment: 'Treatment 1', date: 'January 24, 2022 9:00:00', status: 'Approved' },
    { id: 2, name: 'Adam Smith', email: 'adamsmith@example.com', phone: '997576557', treatment: 'Treatment 2', date: 'January 22, 2022 10:30:00', status: 'Approved' },
    { id: 3, name: 'Jane Doe', email: 'janedoe@example.com', phone: '997576557', treatment: 'Treatment 4', date: 'February 20, 2022 12:00:00', status: 'Approved' },
    { id: 4, name: 'John Smith', email: 'jonhnsmith@gamil.com', phone: '997576557', treatment: 'Treatment 2', date: 'January 28, 2022 13:30:00', status: 'Cancelled' },
  ];

  @ViewChild('All', { static: true }) allList: AppointmentListComponent;
  @ViewChild('Past', { static: true }) pastList: AppointmentListComponent;
  @ViewChild('Today', { static: true }) todayList: AppointmentListComponent;
  @ViewChild('Upcoming', { static: true }) upcommingList: AppointmentListComponent;

  constructor() { }

  ngOnInit() {
  }

  applyFilter(event) {
    this.appointmentList.push(event.appointmentData);
    this.allList.filterData();
    this.upcommingList.filterData();
    this.todayList.filterData();
  }

  updateList(event) {
    this.appointmentList.find(item => item.id === event.id).status = event.status;
    this.allList.filterData();
    this.upcommingList.filterData();
    this.todayList.filterData();
  }
}
