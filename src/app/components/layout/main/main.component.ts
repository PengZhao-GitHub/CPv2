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
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeSideMenu() {
    document.getElementById('side-menu').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
  }

}
