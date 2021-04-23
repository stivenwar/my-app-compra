import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(public http : HttpClient) { }

  url = 'http://localhost:3000/grocery';

  loadProducts(){
    return this.http.get(this.url);
  }
  patchProducts(id:any, json :string){
    return this.http.patch(this.url+`/${id}`,json);
  }
}
