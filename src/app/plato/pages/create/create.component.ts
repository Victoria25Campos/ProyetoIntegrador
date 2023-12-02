import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Plato } from '../../interfaces/plato';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public titulo:string="Crear un nuevo plato";
  formData = new FormData();

  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0
  }

  constructor(private serPlato:PlatoService){

  }


  enviarFormulario() {

    let plato = { codigo: 0, nombre: this.plato.nombre, descripcion: this.plato.descripcion, imagen: "", precio: this.plato.precio };

    console.log("plato antes de JSON.stringify:", plato);

    this.formData.append("plato", JSON.stringify(plato));

    console.log("formData después de append:", this.formData);
    
    this.formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.serPlato.save(this.formData).subscribe(
      response => {
        if (response) {
          alert("Plato registrado");
        }
      },
      error => {
        console.error("Error en la solicitud POST:", error);
      }
    );
  }


  onFileSelected(event:any){
    console.log("se añadio un archivo")

    const file:File = event.target.files[0];

    this.formData.append("fichero", file);
  }


}
