import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileID: String;
  username: String;
  email: String;


  constructor(private routeParam: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit() {
    this.routeParam.paramMap.subscribe(params => {
      this.profileID = params.get('id');
      console.log(this.profileID);
      //Get user profile 
      this.accountService.getProfile(this.profileID).subscribe(userProfile => {
          console.log(userProfile);
          this.username = userProfile.username;
          this.email = userProfile.email;
      })
    });
  }
}
