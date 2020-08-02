import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  state$: Observable<object>; //state object

  baseUrl: string = "http://localhost:1337"

  product = {};
  productDetail = {};
  coverages = [];

  selectedInsurer: string;
  selectedInsurerID: string ;
  selectedInsurerUrl: string;

  selectedProductLine: string;
  selectedProductLineID: string;

  selectedProductID: string;
  selectedProduct: string;

  selectedCoverages = [];

  premium; 


  ageRange = Array.from(Array(61), (_, i) => i + 20); //Array.from(Array(100).keys());

  age: number = 30;
  sex: string = "F";


  constructor(
    private routeParam: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cd: ChangeDetectorRef,) {

  }

  ngOnInit() {

    /* close Index and Footer section to give a clean screen which focus on quote only*/
    document.getElementById('main-links').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('gotop').style.marginBottom = '60px';

    /* Manage state among angular components*/
    /************************************** */
    this.state$ = this.routeParam.paramMap
      .pipe(map(() => {
          let product = window.history.state; /*get state object*/
          console.log('inside of state:', product);

          /* get CMS system id and product name */
          this.selectedInsurer = product.insurer.name;
          this.selectedInsurerID = product.insurer.id;
          this.selectedInsurerUrl = `${this.baseUrl}${product.insurer.logo.url}`;
          this.selectedProductLine = product.product_line.name;
          this.selectedProductLineID = product.product_line.id;
          this.selectedProductID = product.id; // CMS system id
          this.selectedProduct = product.name;
          /* end of getting CMS system id and product name */

          // Call PAS API to get the product structure from PAS system
          this.productService.getProduct(product['product_id']).subscribe(result => {
            if (result) {
              console.log('PAS API', result);
              this.productDetail = result['product'];
              if (this.productDetail) {
                this.coverages = this.productDetail['coverages'];
                console.log('quote-init', this.coverages);

                //Populate the defaul selection - select all.  
                /************************************** */
                this.coverages.forEach(cov => {
                  console.log(cov.coverageCode, cov.limitOption);
                  let limitOption = cov.limitOption;
                  let defaultLimit = limitOption[limitOption.length - 1];
                  this.selectedCoverages.push({ coverageCode: cov.coverageCode, option: defaultLimit});
                });
            
                console.log(this.selectedCoverages);
                //Call API to get the default premium
                this.callQuoteAPI(); 
              }

            } else {
              this.productDetail = null;
            }
          })
        return product;
      }));

    console.log('checkpoint!');
    
    //To solve the Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined: undefined'. Current value: 'undefined: 8'.
    /************************************** */
    this.cd.detectChanges();
    
    //Go to the top of the screen
    /************************************** */
    window.scroll(0, 0);

  }

  goBack() {
    this.router.navigate(['/products', this.selectedInsurerID, this.selectedInsurer, this.selectedProductLineID, this.selectedProductLine, this.selectedInsurerUrl]);
  }


  onSelectCoverage(event){
    console.log(event.target.value);
    console.log(event.target.checked);
    console.log(event.target.name);
    console.log(event.target.id);

    console.log(this.selectedCoverages);

    var coverageCode = event.target.value;
    var coverageChecked = event.target.checked;

    let coverageDetail = document.getElementById(coverageCode); //get the form element
    console.log('Select the form', coverageDetail);
    
    if (!coverageChecked) {

      coverageDetail.style.display = "none";
      //Remove the coverage 
      this.selectedCoverages = this.selectedCoverages.filter(t => t.coverageCode != coverageCode);
      console.log(this.selectedCoverages);
    
    } else {
      coverageDetail.style.display ="flex";

      /* Use vanila java script to manage the form - Radio values*/
      var form = document.getElementById(coverageCode); //get the form element
      var optionListValue = form[coverageCode].value;  //get the radio box list of inside of the form by using the radio name
      console.log("get radio value", optionListValue);

      this.selectedCoverages.push({ coverageCode: coverageCode, option: optionListValue });
      console.log(this.selectedCoverages);

      

    }

    //Call API
    this.callQuoteAPI();
  
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

    //Call API
    this.callQuoteAPI();

  }

  onAgeChange(event){
   this.callQuoteAPI();

  }

  onGenderChange(event){
    this.callQuoteAPI();
  }

  callQuoteAPI(){
    if (this.selectedCoverages.length >= 0) {
      var customer = {
        sex: this.sex,
        age: this.age
      }
      console.log('cusotmer:', customer);
      console.log('Selected Coverages:', this.selectedCoverages);
      this.productService.getQuote({ customer: customer, coverages: this.selectedCoverages }).subscribe(quote => {
        this.premium = quote['result'].totalPremium;
      });
    }
  }


  ngOnDestroy(){
    //window.alert('Will distroy this component');
    /* Restore the links and footer*/
    document.getElementById('main-links').style.display = '';
    document.getElementById('main-footer').style.display = '';
    document.getElementById('gotop').style.margin = '';
  }
}
