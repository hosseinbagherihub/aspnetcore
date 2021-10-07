import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App 1';
  users : any;

  /**
   Dependency injection , just like .net core
   */
  constructor(private http:HttpClient , private AccountService : AccountService) {
    

  }
  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user')|| '{}');
    this.AccountService.setCurrentUser(user);
  }

  // get all users list
  /*getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users=response;
    },error => {
      console.log(error);
    })
  }
  */
}
