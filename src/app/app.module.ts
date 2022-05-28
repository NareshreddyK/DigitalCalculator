import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { RowColorDirective } from './directives/row-color.directive';
import { HomeComponent } from './home/home.component';
import { IncomeExpenseComponent } from './main/income-expense/income-expense.component';
import { ItemComponent } from './main/item/item.component';
import { MainComponent } from './main/main.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { OrderbyAgeComponent } from './search_details/orderbyAge/orderbyAge.component';
import { SearchComponent } from './search_details/search/search.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ForgotPasswordComponent } from './user-registrations/login/forgot-password/forgot-password.component';
import { LoginComponent } from './user-registrations/login/login.component';
import { UserListComponent } from './user-registrations/user-list/user-list.component';
import { UserRegistrationsComponent } from './user-registrations/user-registrations.component';


const lang = "en-US";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MainComponent,
    ItemComponent,
    IncomeExpenseComponent,
    UserRegistrationsComponent,
    UserListComponent,
    LoginComponent,
    CaptchaComponent,
    ForgotPasswordComponent,
    AppointmentsComponent,
    AddAppointmentComponent,
    AppointmentListComponent,
    UserDetailsComponent,
    SearchPipe,
    SortPipe,
    SearchComponent,
    OrderbyAgeComponent,
    RowColorDirective
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'iec', component: MainComponent },
      { path: 'register', component: UserRegistrationsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'user-data', component: UserListComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'Appointment', component: AppointmentsComponent },
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'orderby', component: OrderbyAgeComponent },
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.setLocale(lang)
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [AddAppointmentComponent]
})
export class AppModule { }
