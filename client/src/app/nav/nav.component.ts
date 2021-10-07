import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  model:any={};
  constructor(public accountService:AccountService) { } // به جهت دسترسی در لایه اچ تی ام ال می بایست پابلیک تعریف شود

  ngOnInit(): void {
   
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    },error => {
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
  }

}
