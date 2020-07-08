import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.css']
})
export class ProductLineComponent implements OnInit {

  @Input() productLine;

  baseUrl:string = "http://localhost:1337"
  logoUrl:string;

  insurers: [];

  constructor() { }

  ngOnInit() {
    console.log(this.productLine.logo.url);
    this.logoUrl = `${this.baseUrl}${this.productLine.logo.url}`;
    console.log(this.logoUrl);
    this.insurers = this.productLine.insurers;
    
  }

}
