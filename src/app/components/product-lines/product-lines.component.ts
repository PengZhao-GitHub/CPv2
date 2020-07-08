import { Component, OnInit } from '@angular/core';
import { ProductLinesService } from 'src/app/services/product-lines.service';

@Component({
  selector: 'app-product-lines',
  templateUrl: './product-lines.component.html',
  styleUrls: ['./product-lines.component.css']
})
export class ProductLinesComponent implements OnInit {

  productLines: any[];

  constructor(private productLineService: ProductLinesService) { }

  ngOnInit() {
    this.productLineService.getProductLines().subscribe(productLines => {

      this.productLines = productLines;
      console.log(this.productLines);

    })
  }

}
