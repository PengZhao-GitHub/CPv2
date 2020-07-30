import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product;

  productDetail = {};
  coverages = [];
  quoteMode = false;
  sex = 'F';
  age = 0;
  selectedCoverages = [];
  premium;


  constructor(private productService: ProductService) { 
      //console.log('contructor:', this.product.url);
      //this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(this.product.url);
  }

  ngOnInit() {
    
    if (this.product.product_id === '003') {
      this.sex = 'M';
    }
    this.productService.getProduct(this.product.product_id).subscribe(result => {
      if (result) {
        this.productDetail = result['product'];
        //console.log('productDetail', this.productDetail);
        this.coverages = this.productDetail['coverages'];
      } else {
        this.productDetail = null;
      }

    })

    window.scroll(0, 0);

  }

  changeToQuoteMode() {
    this.quoteMode = !this.quoteMode;

  }

  onSelectCoverage(event) {
    console.log(event.target.value);
    console.log(event.target.checked);
    console.log(event.target.name);
    console.log(event.target.id);

    var coverageCode = event.target.value;
    var coverageChecked = event.target.checked;

    //if the selected coverageCode exist, delete it
    this.selectedCoverages = this.selectedCoverages.filter(t => t.coverageCode != coverageCode);

    if (coverageChecked) {
      var form = document.getElementById(coverageCode); //get the form element
      var optionListValue = form[coverageCode].value;  //get the radio box list of inside of the form by using the radio name
      console.log("get radio value", optionListValue);

      this.selectedCoverages.push({ coverageCode: coverageCode, option: optionListValue })
    }

    console.log(this.selectedCoverages);

    if (this.selectedCoverages.length >= 0) {
      var customer = {
        sex: this.sex,
        age: this.age
      }

      this.productService.getQuote({ customer: customer, coverages: this.selectedCoverages }).subscribe(quote => {
        console.log(quote);
        this.premium = quote['result'].totalPremium;
      });
    }
  }

  onSelectOption(event) {
    console.log(event.target.value);
    console.log(event.target.checked);
    console.log(event.target.name);

    var coverageCode = event.target.name;
    var selectedOption = event.target.value;

    //if the selected coverageCode exit, update option
    this.selectedCoverages.forEach(t => {
      if (t.coverageCode === coverageCode) {
        t.option = selectedOption;
      }
    })

    console.log(this.selectedCoverages);

    if (this.selectedCoverages.length >= 0) {
      var customer = {
        sex: this.sex,
        age: this.age
      }
      this.productService.getQuote({ customer: customer, coverages: this.selectedCoverages }).subscribe(quote => {
        console.log(quote);
        this.premium = quote['result'].totalPremium;
      });
    }


  }

  // When the user clicks on the button, open the modal
  openMovie(url) {
    
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.setAttribute('src', url);
    console.log(iframe);


  }

  /*
  closeMovie(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  */

}
