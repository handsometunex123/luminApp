import { filter, switchMap } from 'rxjs/operators';
import { SidenavDataService } from './../side-nav/_services/sidenav-data.service';
import { MainpageDataService } from './_service/mainpage-data.service';
import { Product, Currency } from './products';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  allProducts: Product[];
  loading = false;
  // currency = "USD";
  currency = this.sideServ.currency$.getValue();
  error: string;
  constructor(private apollo: Apollo, public pageServ: MainpageDataService,
    public sideServ: SidenavDataService) { }

  ngOnInit(): void {
    this.callApi();
  }
  @Output() open: EventEmitter<boolean> = new EventEmitter()

  /** This method add new item to a behaviour subject / item list then opens the side menu **/
  addToCart(product: Product) {
    console.log(product);
    this.pageServ.products$.next(product)
    this.open.emit(true);
  }



/** This calls the API then returns the data */
  callApi() {
    this.error = "";
    this.apollo
      .query<any>({
        query: gql`
        query($currency: Currency!) 
      {
        products{
          id,
          title,
          image_url,
          price(currency: $currency)
        }
      }
      `,
      variables: {
        currency: this.currency
      }
      }).subscribe(({ data, loading }) => {
        if(data.products) this.allProducts = data.products;
        else this.error ="Products does not exist";
        this.loading = loading;
      }
      )
      

  }

}
