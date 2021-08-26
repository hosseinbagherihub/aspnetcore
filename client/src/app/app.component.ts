import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http:HttpClient) {
    

  }
  ngOnInit(): void {
    this.getUsers();
  }

  // get all users list
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users=response;
    },error => {
      console.log(error);
    })
  }
}
