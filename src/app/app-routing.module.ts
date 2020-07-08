import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { ProductLinesComponent } from './components/product-lines/product-lines.component';


const routes: Routes = [
  { path: '', component: ProductLinesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
