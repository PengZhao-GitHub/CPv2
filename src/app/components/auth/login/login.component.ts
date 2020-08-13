import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileID: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.profileID = localStorage.getItem('profileID');
    if(this.profileID) {
      this.router.navigate(['/profile',this.profileID])
    }
    window.scroll(0,0); 
  }

}
