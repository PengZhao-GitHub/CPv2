import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product;

  productDetail = {};
  coverages = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProduct(this.product.product_id).subscribe(result => {
      if (result) {
        this.productDetail = result['product'];
        console.log('productDetail', this.productDetail);
        this.coverages = this.productDetail['coverages'];
      } else {
        this.productDetail = null;
      }

    })
  }

}
