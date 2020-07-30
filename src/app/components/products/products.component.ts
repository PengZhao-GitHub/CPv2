import { Component, OnInit } from '@angular/core';
import { ProductLinesService } from 'src/app/services/product-lines.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[];
  selectedInsurer: string;
  selectedInsurerID: string;
  selectedProductLine: string;
  selectedProductLineID: string;
  selectedInsurerUrl: string;

  showcases: any[];
  baseUrl:string = "http://localhost:1337"

  showcaseVideo: string;

  constructor(
    private productLineService: ProductLinesService,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.selectedInsurerID = params.get('companyid');
      this.selectedInsurer = params.get('companyname');
      this.selectedProductLine = params.get('productlineid');
      this.selectedProductLine = params.get('productlinename');
      this.selectedInsurerUrl = params.get('url');
    });

    this.productLineService.getProducts().subscribe(products => {

      //this.products = products;
      this.products = products.filter(t => t.insurer.name === this.selectedInsurer && t.product_line.name === this.selectedProductLine);
      console.log('get products from CMS',this.products);


    });

    this.productLineService.getShowcases().subscribe(showcases => {
      this.showcases = showcases.filter(item => item.UsageType === 'Products');
      console.log(this.showcases);
      console.log(this.showcases[0].Content[0].url);
      this.showcaseVideo = `${this.baseUrl}${this.showcases[0].Content[0].url}`;
      console.log(this.showcaseVideo);
    })

  }

  closeMovie(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.setAttribute('src', '');
    console.log(iframe);

  }


}
