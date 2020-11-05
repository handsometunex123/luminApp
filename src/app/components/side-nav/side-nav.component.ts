import { SidenavDataService } from './_services/sidenav-data.service';
import { Product } from './../main-page/products';
import { MainpageDataService } from './../main-page/_service/mainpage-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { filter, switchMap, tap, shareReplay, map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  itemCount = 1;
  newItem: Product;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  currencyControl = new FormControl('USD');
  currency = ['USD', 'NGN'];
  selectedProduct: Product[] = [];
  constructor(public mainService: MainpageDataService,
    public sideServ: SidenavDataService
    ) { }

  ngOnInit(): void {
    this.getSideProducts();
  }


  getSelect($event: MatSelectChange){
    console.log($event.value);
    this.sideServ.currency$.next($event.value);
  }
  

  getSideProducts() {
    this.mainService.productsSource$.subscribe(res => {
      console.log(res);
      if (res) {
        const itemExist = this.selectedProduct.find(x => x.id == res.id);
        if (itemExist) {
          itemExist.count++;
        } else {
          this.newItem = { ...res };
          this.newItem.count = 1;
          this.selectedProduct.push(this.newItem);
        }
        console.log(this.selectedProduct);
      }


    })
  }

  reduceCount(id) {
    const itemExist = this.selectedProduct.find(x => x.id == id);
    const itemIndex = this.selectedProduct.indexOf(itemExist);
    itemExist.count--;
    console.log(this.selectedProduct);
    if(itemExist.count < 1 ){
      this.selectedProduct.splice(itemIndex, 1);
    }


  }

  removeItem(id){
    const itemExist = this.selectedProduct.find(x => x.id == id);
    const itemIndex = this.selectedProduct.indexOf(itemExist);
    if(itemExist){
      this.selectedProduct.splice(itemIndex, 1);
    }

  }

  increaseCount(id) {
    const addItem = this.selectedProduct.find(x => x.id == id);
    addItem.count++;
  }

  getAllItem(allItems): number{
    console.log(allItems);
    // return allItems.reduce((a, b) => ({x: a.price * b.count}));

    return allItems.reduce(function (acc, obj) { return acc + (obj.price * obj.count) }, 0); // 7
  }



}
