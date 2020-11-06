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
  currencyControl = new FormControl('USD');
  currency = ['USD', 'NGN'];
  emptyCartMessage = 'Your cart is empty'
  selectedProduct: Product[] = [];
  constructor(public mainService: MainpageDataService,
    public sideServ: SidenavDataService
    ) { }

  ngOnInit(): void {
    this.getSideProducts();
  }

/** Method gets the currency selected */
  getSelect($event: MatSelectChange){
    console.log($event.value);
    this.sideServ.currency$.next($event.value);
  }
  
/** This method gets the selected product */
  getSideProducts() {
    this.mainService.productsSource$.subscribe(res => {
      console.log(res);
      if (res) {
        const itemExist = this.selectedProduct.find(x => x.id == res.id);
        /** Checks if the item exist then increase the qty else push the item to the Array */
        if (itemExist) {
          itemExist.count++;
        } else {
          this.newItem = { ...res };
          /** The array is manipulated the count is added to each to cater for the different qtys */
          this.newItem.count = 1;
          this.selectedProduct.push(this.newItem);
        }
      }
    })
  }

  
 /**This triggers when you click the - button 
  id of the selected item was passed */
  reduceCount(id) {
    const itemExist = this.selectedProduct.find(x => x.id == id);
    const itemIndex = this.selectedProduct.indexOf(itemExist);
    itemExist.count--;
    /** check if its less than one the removes the item from the array of products */
    if(itemExist.count < 1 ){
      this.selectedProduct.splice(itemIndex, 1);
    }


  }

  /**Removes the item by ID */
  removeItem(id){
    const itemExist = this.selectedProduct.find(x => x.id == id);
    const itemIndex = this.selectedProduct.indexOf(itemExist);
    if(itemExist){
      this.selectedProduct.splice(itemIndex, 1);
    }

  }

   /**This triggers when you click the + button */
 /** id of the selected item was passed */
  increaseCount(id) {
    const addItem = this.selectedProduct.find(x => x.id == id);
    addItem.count++;
  }


   /**sums the whole product amount together */
  getAllItem(allItems): number{
    return allItems.reduce(function (acc, obj) { return acc + (obj.price * obj.count) }, 0); // 7
  }



}
