import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';

import { IUser } from '../IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  closeResult: string;
  currentUser: any;
  editForm: FormGroup;
  users: any = [];

  constructor(private modalService: NgbModal, private apiService: ApiService, private fb: FormBuilder,) {
    this.apiService.getUser().subscribe((users) => {
      this.users = users;
    })
  }

  ngOnInit() {
  }

  delete(user) {
    this.users = this.users.filter(u => u.email !== user.email);
  }

  open(content, currentUser) {
    this.currentUser = currentUser;
    this.editForm = this.fb.group({
      name: [currentUser.name, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]{4,20}')]],
      mobileNumber: [currentUser.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      email: [currentUser.email, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public get f() { return this.editForm.controls; }

  save(modal) {
    if (this.editForm.valid) {
      const editUser = this.editForm.value;
      const user: IUser = this.users.find(user => user.id === this.currentUser.id);
      user.name = editUser.name;
      user.mobileNumber = editUser.mobileNumber;
      this.apiService.updateUser(user, user.id).subscribe(() => {
        alert(user.username + " updated succesfully!!");
      }, (err) => { console.error(err); },
        () => { }
      );
      modal.close('Saved');
    } else {
      this.editForm.get('name').markAsDirty();
      this.editForm.get('mobileNumber').markAsDirty();
    }
    //save logic
  }

  /* save() {




        this.apiService.updateUser(user, uses.id).subscribe(
          (data) => {
            alert(data.username + " added succesfully!!");
            this.router.navigate(['/login'])
          },
          (err) => { console.error(err); },
          () => { }
        );


  } */
}
