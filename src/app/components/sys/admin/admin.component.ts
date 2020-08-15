import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  baseUrl:string = 'http://localhost:5000/pas/api';
  
  clientName: string = "Account";
  clientSecret: string = "Secret";
  APIToken: string = localStorage.getItem('PAS.API.Token');

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  getToken() {
    
    let acc = {
      clientName: this.clientName,
      clientSecret: this.clientSecret
    }

    this.accountService.getToken(acc).subscribe(
      result => {
        console.log('Token', result);
        this.APIToken = result.token;
        console.log(this.APIToken);
        localStorage.setItem('PAS.API.Token', this.APIToken);
      },
      err => {
        console.log(err.error);
        this.APIToken = err.error;
      }
    )
  }

}
