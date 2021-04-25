import { Component, OnInit } from '@angular/core';
import {PeticionService} from "../../services/peticion.service";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  productos: any[];
  productosAdd: any[] = [];

  favoritos: any[] = [];




  constructor(public service: PeticionService) { }

  ngOnInit() {

    this.service.loadProducts()
      .subscribe((res:any)=>{
        this.productos = res
        console.log(this.productos);
      },
        (error => {
          console.log(error);
        }));


  }

  getInfo(p: any) {
    let repetido = true;

    if (this.productosAdd.length === 0){
      this.productosAdd.push(p);
      localStorage.setItem("prodJson", JSON.stringify(this.productosAdd));
    }

    for (let i = 0; i <this.productosAdd.length ; i++) {

         if (p.id === this.productosAdd[i].id){
            repetido = false;
           console.log('repetido')
         }
    }
    this.addProducto(repetido,p);

  }

  addProducto(r: boolean, p: any) {
    if (r){
      console.log(r);
      this.productosAdd.push(p);
      localStorage.setItem("prodJson", JSON.stringify(this.productosAdd));
      console.log(this.productosAdd);
    }
  }


  addFavorito(p: any) {

    let repe = true;
    if (this.favoritos.length === 0){
      this.favoritos.push(p);
      localStorage.setItem("prodFavoritos", JSON.stringify(this.favoritos));
    }

    for (let i = 0; i <this.favoritos.length ; i++) {

      if (p.id === this.favoritos[i].id){
        repe = false;
        console.log('repetido')
      }
    }
    this.favorito(repe,p);
  }
  favorito(repe: boolean, p: any) {
    if (repe){
      console.log(repe);
      this.favoritos.push(p);
      localStorage.setItem("prodFavoritos", JSON.stringify(this.favoritos));
      console.log(this.favoritos);
    }
  }

}
