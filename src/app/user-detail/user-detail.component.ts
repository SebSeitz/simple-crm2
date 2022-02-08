import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('Got ID', this.userId);
      this.getUser();
    })
  }

  getUser(){
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user: any) =>{
      this.user = new User(user); // das JSON user wird in ein Objekt vom Typ User umgewandelt
      console.log('Retrieved User', this.user);
    })
  }

  openAddressDialog(){

  }

  editUserDetail(){
    this.dialog.open(DialogEditUserComponent);
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }
}
