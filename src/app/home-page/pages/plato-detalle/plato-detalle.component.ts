import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plato } from 'src/app/plato/interfaces/plato';
import { PlatoService } from 'src/app/plato/services/plato.service';

@Component({
  selector: 'app-plato-detalle',
  templateUrl: './plato-detalle.component.html',
  styleUrls: ['./plato-detalle.component.css']
})
export class PlatoDetalleComponent {


  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0,
    "imageUrl":null
  }

  constructor(private _route:ActivatedRoute, private serPlato:PlatoService){

  }

  ngOnInit(){
    let id = this._route.snapshot.paramMap.get("id");
    if(id!=null){
      this.searchById(parseInt(id))
    }
  }

  searchById(id:number):void{
    this.serPlato.searchById(id).subscribe(response=>{
      if(response){
        this.plato=response;
        this.loadImage(this.plato.imagen, this.plato)
      }
    })
  }

  loadImage(filename: string, plato: Plato) {
    this.serPlato.getImage(filename).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const imageUrl = e.target.result;
            console.log(imageUrl); // Imprime la URL de la imagen
            plato.imageUrl = imageUrl; // Asigna la URL de la imagen al objeto Plato
          }
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error al cargar la imagen:', error);
        plato.imageUrl = null; // Puedes establecerlo en null si ocurre un error
      }
    );
  }
}
