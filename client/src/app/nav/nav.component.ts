import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  model:any={};
  constructor(public accountService:AccountService,// به جهت دسترسی در لایه اچ تی ام ال می بایست پابلیک تعریف شود
              private router:Router,
              private toastr:ToastrService) { } 

  ngOnInit(): void {
    console.log("INIT NAV");
   var x=this.accountService.currentUser$;
   console.log(x);
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/members');
    },error => {
      this.toastr.error(error.error);
      
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
