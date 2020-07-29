import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  openSideMenu() {
    console.log("clicked");
    document.getElementById('cp-side-menu').style.width = '250px';
    document.getElementById('cp-main').style.marginLeft = '250px';
    //document.getElementById('main').style.width = 'calc(100% - 250px)';
  }

  closeSideMenu() {
    document.getElementById('cp-side-menu').style.width = '0px';
    document.getElementById('cp-main').style.marginLeft = '0px';
    //document.getElementById('main').style.width = '100%';
  }

}
