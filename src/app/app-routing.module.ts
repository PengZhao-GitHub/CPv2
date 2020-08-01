import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { ProductLinesComponent } from './components/product-lines/product-lines.component';
import { ProductsComponent } from './components/products/products.component';
import { QuoteComponent } from './components/newBusiness/quote/quote/quote.component';



const routes: Routes = [
  { path: '', component: ProductLinesComponent},
  { path: 'products/:companyid/:companyname/:productlineid/:productlinename/:url', component: ProductsComponent},
  { path: 'quote', component: QuoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
