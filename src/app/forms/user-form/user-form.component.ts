import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsService } from '../forms.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    profileImage: new FormControl('')
  });

  displayedColumns = ['email', 'phone', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  currentUser = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "profileImage": ""
  }
  updateUser: boolean = false;

  constructor(private formService: FormsService) { }

  ngOnInit(): void {
    this.getAlluser();
    console.log(this.dataSource)
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  saveUser() {
    // Api call for adding new user.
    this.formService.createUser(this.userForm.value).toPromise()
      .then((res) => {
        console.log('Resp: ', res);
        this.getAlluser();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  getAlluser() {
    // Api call for getting list of users.
    this.formService.getAllUserList().toPromise()
      .then((res) => {
        this.dataSource = res;
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  getUserDetails(email) {
    // Api call for getting list of users.
    this.formService.getUserDetails(email).toPromise()
      .then((res) => {
        console.log('Resp: ', res);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  deleteUser(email) {
    // Api call for deleting users.
    this.formService.deleteUser(email).toPromise()
      .then((res) => {
        console.log('Resp: ', res);
        this.getAlluser();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  editUser(row) {
    this.currentUser = row;
    this.updateUser = true;
    this.userForm.get('email').disable();
  }

  modifyUser() {
    // Api call for modifying users.
    this.formService.updateUser(this.userForm.value, this.userForm.get('email').value).toPromise()
      .then((res) => {
        console.log('Resp: ', res);
        this.getAlluser();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }
}
