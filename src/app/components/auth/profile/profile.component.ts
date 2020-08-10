import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileID: String;

  constructor(private routeParam: ActivatedRoute) { }

  ngOnInit() {
    this.routeParam.paramMap.subscribe(params => {
      this.profileID = params.get('id');
      console.log(this.profileID);
    });
  }
}
