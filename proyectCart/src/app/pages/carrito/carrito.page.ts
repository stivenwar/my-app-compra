import {Component, OnInit} from '@angular/core';
import {PeticionService} from "../../services/peticion.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productos: any[];
  productos2: any[];
  numero: number[] = [];
  numero2: number = 0;
  suma2: number = 0;

  mapStock = new Map();


  constructor(public service: PeticionService,
              public route: ActivatedRoute,
              public alert : AlertController) {
  }

  ngOnInit() {

    const productos = localStorage.getItem("prodJson");
    this.productos = JSON.parse(productos);


    localStorage.setItem("productosCart", JSON.stringify(this.productos));
    const p2 = localStorage.getItem("productosCart");
    this.productos2 = JSON.parse(p2);

    for (let i = 0; i < this.productos2.length; i++) {

      this.mapStock[this.productos2[i].id] = 1;

    }


    /*
    this.productos2.forEach((num) =>{

      this.numero += num.price;

    })
    * */


  }

  aumentar(id: any, stock: any, price: any) {

    for (let i = 0; i < this.productos2.length; i++) {

      if (this.productos2[i].id === id){

        let contador = this.mapStock[id];

        let precio = (contador+1)*price;

        if (contador < stock){
          contador = contador+1;

          this.numero[i] = precio;

        }
        this.mapStock[id] = contador;
      }

    }
    this.sumaTotal();

  }

  disminuir(id: any, price: any) {
    let spli;
    for (let i = 0; i < this.productos2.length; i++) {

      if (this.productos2[i].id === id){
        let contador = this.mapStock[id];



        let precio = (contador-1)*price;

        if (contador > 0){
          this.numero[i] = precio;
          contador--;
          if (contador == 0){
            contador++;
            let va = this.productos2.indexOf(this.productos2[i]);
            spli = this.productos.splice(va,1);
            if (spli.length ===0){
              this.productos.shift();

            }
          }

          console.log(this.productos);
        }

        this.mapStock[id] = contador;
      }
    }
    this.sumaTotal();

  }
  sumaTotal(){
    let suma = 0;
    this.numero.forEach (function(numero){
      suma += numero;
    });
    this.numero2 = suma;
  }

  pagar() {
  this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alerta de pago',
      subHeader: 'Compra con tarjeta',
      message: 'Estas seguro de que tienes todos tus productos ',
      buttons: ['OK']
    });

    await alert.present();
  }
}
