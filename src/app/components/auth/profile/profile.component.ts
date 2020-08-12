import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'ngx-cookie-service';

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
    private accountService: AccountService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.routeParam.paramMap.subscribe(params => {
      this.profileID = params.get('id');
      console.log(this.profileID);

      if (this.profileID) {
        //Get user profile 
        this.accountService.getProfile(this.profileID).subscribe(userProfile => {
          console.log(userProfile);

          this.username = userProfile.username;
          this.email = userProfile.email;
        }, (err) => {
          console.log('403 forbidden',err);
          this.router.navigate(['/login']);
        })
      } else {
        this.profileID = "The user has been logged out";
      }
    });
  }

  setCookie() {
    //test cookie service
    this.cookieService.set('myCookie', 'Peng zhao');
  }

  readCookie() {
    //test cookie service
    let cookieValue = this.cookieService.get('myCookie');
    console.log('myCookie', cookieValue);
  }
}
