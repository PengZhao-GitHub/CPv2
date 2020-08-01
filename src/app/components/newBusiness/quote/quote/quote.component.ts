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


  constructor(
    private routeParam: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cd: ChangeDetectorRef,) {

  }

  ngOnInit() {

    console.log('test this.routeParam.paramMap', this.routeParam.paramMap);

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

          // Call PAS API
          this.productService.getProduct(product['product_id']).subscribe(result => {
            if (result) {
              console.log('PAS API', result);
              this.productDetail = result['product'];
              if (this.productDetail) {
                this.coverages = this.productDetail['coverages'];
                console.log('quote-init', this.coverages);
              }

            } else {
              this.productDetail = null;
            }
          })

        return product;
      }));

    //To solve the Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined: undefined'. Current value: 'undefined: 8'.
    this.cd.detectChanges();

    //Go to the top of the screen
    window.scroll(0, 0);


  }

  goBack() {
    this.router.navigate(['/products', this.selectedInsurerID, this.selectedInsurer, this.selectedProductLineID, this.selectedProductLine, this.selectedInsurerUrl]);
  }

}
