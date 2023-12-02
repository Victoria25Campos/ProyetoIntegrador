import { Component, PlatformRef } from '@angular/core';
import { Plato } from '../../interfaces/plato';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  titulo:string="Listado de Platos";
  imageUrl: string | ArrayBuffer | null = null;
  platos:Plato[]=[]

  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0,
    "imageUrl":null
  }


  constructor(private serPlato:PlatoService){

  }

  ngOnInit(){
    this.listarPlatos();
  }

  /*listarPlatos(): void {
    this.serPlato.listAll().subscribe(response => {
      if (response) {
        response.forEach(p => {
          // Llama a loadImage para cargar la imagen
          this.loadImage(p.imagen);

          p.imageUrl=this.imageUrl
          console.log(this.imageUrl)
        });

        this.platos = response;

        console.log(this.platos)
      }
    });
  }




  loadImage(filename:string) {
    this.serPlato.getImage(filename).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if(e.target){
            this.imageUrl = e.target.result;
            console.log(this.imageUrl)
          }
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error al cargar la imagen:', error);
        this.imageUrl = null;
      }
    );
  }
*/

listarPlatos(): void {
  this.serPlato.listAll().subscribe(response => {
    if (response) {
      this.platos = response;
      this.platos.forEach(p => {
        // Llama a loadImage para cargar la imagen
        this.loadImage(p.imagen, p); // Pasa el objeto Plato como argumento
      });
    }
  });
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
