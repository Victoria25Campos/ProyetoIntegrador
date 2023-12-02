import { Plato } from '../../interfaces/plato';
import { PlatoService } from './../../services/plato.service';
import { Component, Input } from '@angular/core';
import { ListadoComponent } from '../listado/listado.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  public titulo:string="Crear un nuevo plato";
  idPlato:number=0;
  formData = new FormData();


  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0,
    "imageUrl":null
  }

  constructor(private serPlato:PlatoService, private rutaActiva: ActivatedRoute){

  }

  ngOnInit(){
    this.idPlato=this.rutaActiva.snapshot.params["id"];
    this.searchById(this.idPlato);
  }

  enviarFormulario() {

    let plato = { codigo: this.plato.codigo , nombre: this.plato.nombre, descripcion: this.plato.descripcion, imagen:  this.plato.imagen, precio: this.plato.precio };

    console.log("plato antes de JSON.stringify:", plato);

    this.formData.append("plato", JSON.stringify(plato));

    console.log("formData después de append:", this.formData);

    this.formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.serPlato.update(this.formData).subscribe(
      response => {
        if (response) {
          alert("Plato modificado");
        }
      },
      error => {
        console.error("Error en la solicitud PUT:", error);
      }
    );
  }


  onFileSelected(event: any) {
    console.log("Se añadió un archivo");

    const file: File = event.target.files[0];

    // Cambia el nombre del archivo aquí
    const newFileName = this.plato.imagen.substring(8); // Cambia "nuevo_nombre.png" por el nombre deseado

    // Crea un nuevo objeto File con el nombre modificado
    const modifiedFile = new File([file], newFileName, { type: file.type });

    this.formData.append("fichero", modifiedFile);
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

  eliminarPlato():void{
    this.serPlato.delete(this.plato.codigo).subscribe(response=>{
      if(response){
        alert("plato eliminado")
      }
    })
  }

}
