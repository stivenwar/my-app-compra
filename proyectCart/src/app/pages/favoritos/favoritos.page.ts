import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: any[];
  favoritos2: any[];

  show: number = 0;

  constructor() {

  }

  ngOnInit() {

    const favoritos = localStorage.getItem("prodFavoritos");
    this.favoritos = JSON.parse(favoritos);

    localStorage.setItem("Favoritos", JSON.stringify(this.favoritos));
    const f2 = localStorage.getItem("Favoritos");
    this.favoritos2 = JSON.parse(f2);


  }

  delete(id: any) {
    let spli;
    for (let i = 0; i < this.favoritos2.length; i++) {

      if (this.favoritos2[i].id === id) {

        let va = this.favoritos2.indexOf(this.favoritos2[i]);
        spli = this.favoritos2.splice(va, 1);
        if (spli.length === 0) {
          this.favoritos2.shift();

        }
      }
    }
  }

   descripcion(index: any) {

    this.show = index;

      let vista =  document.getElementById('caja').style.display;
      if (vista === 'none') {
        vista = 'block';
      } else {
        vista = 'none';
      }
      document.getElementById('caja').style.display = vista;




  }
}
