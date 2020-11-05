import { Product } from './../products';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainpageApiService {
  allProducts: Product[];
  constructor(private apollo: Apollo) { }

  


  

}
