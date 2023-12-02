import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Compra } from 'src/app/models/compra';
import { DetalleCompra } from 'src/app/models/detalleCompra';
import { Plato } from 'src/app/plato/interfaces/plato';
import { PlatoService } from 'src/app/plato/services/plato.service';

@Component({
  selector: 'app-plato-cliente',
  templateUrl: './plato-cliente.component.html',
  styleUrls: ['./plato-cliente.component.css']
})
export class PlatoClienteComponent {
  nombre:string="";
  //pagincion
  pages:number=1;
  listaPlatos:Plato[]=[];
  listaOriginalPlatos: Plato[] = [];
  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0,
    "imageUrl":null
  }

  listaDetalleCompra:DetalleCompra[]=[];

  cliente:Cliente= {
    id:        1,
    name:      "Sevastian",
    apellido:  "Principe",
    correo:    "sevastian@gmail.com",
    direccion: "mz. A lote 13",
    telefono:  "999999999"
  }

  compra:Compra={
  id:      0,
  fecha:   new Date(),
  total:   0,
  cliente: this.cliente,
  listaDetalleCompra : this.listaDetalleCompra
  }

  detalleCompra:DetalleCompra= {
    id:       0,
    cantidad: 0,
    precio:   0,
    total:    0,
    plato:    this.plato
  }

  constructor(private serPlato:PlatoService){

  }

  ngOnInit(){
    this.listarPlatos();
   }


  filtrar(){
    if(this.nombre!==""){
      this.listaPlatos=this.listaOriginalPlatos.filter(p=>{
        console.log("se filtro los platos")
        return p.nombre.toLowerCase().includes(this.nombre.toLowerCase())
      })
    }else{
      this.listarPlatos();;
    }
  }


  listarPlatos(): void {
    this.serPlato.listAll().subscribe(response => {
      if (response) {
        this.listaPlatos = response;
        this.listaOriginalPlatos = [...response];
        this.listaPlatos.forEach(p => {
          // Llama a loadImage para cargar la imagen
          this.loadImage(p.imagen, p); // Pasa el objeto Plato como argumento
          console.log("se listo todos los platos")
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


  agregarAlCarrito(plato:Plato){

    if(localStorage.getItem("carrito")){
      let compra:Compra =  JSON.parse(localStorage.getItem("carrito")!)
      this.compra.listaDetalleCompra = compra.listaDetalleCompra;
      console.log(this.compra.listaDetalleCompra)
      //verificamos que no hayan objetos repetidos
      let detalleValidar:DetalleCompra|undefined= this.compra.listaDetalleCompra.find(d=>{
        console.log(d.plato.codigo, plato.codigo)
        console.log(d.plato.codigo==plato.codigo)
       return d.plato.codigo==plato.codigo
      })
      console.log(detalleValidar)
      if(detalleValidar!==undefined){
        //modificamos el nuevo plato
        this.detalleCompra=this.compra.listaDetalleCompra.find(d=>{
          return d.plato.codigo==plato.codigo
        })!

        this.detalleCompra.cantidad++;
        this.detalleCompra.total=this.detalleCompra.cantidad*this.detalleCompra.precio;

        this.compra.listaDetalleCompra.map(d=>{
          if(d.id==this.detalleCompra.id){
            d=this.detalleCompra;
          }
        })

        localStorage.setItem("carrito", JSON.stringify(this.compra));
    alert("se modifico un plato ya existente")
      }else{
        //añadimos el nuevo plato
        this.detalleCompra.id= this.obtenerNuevoIdDetalleCompra();
        this.detalleCompra.plato=plato;
        this.detalleCompra.cantidad=1;
        this.detalleCompra.precio=plato.precio;
        this.detalleCompra.total=plato.precio*this.detalleCompra.cantidad;

        this.compra.listaDetalleCompra.push(this.detalleCompra)

        localStorage.setItem("carrito", JSON.stringify(this.compra));
        alert("se agrego un plato a un carrito con elementos")

      }
    }
    else{
      //añadimos el nuevo plato
      this.detalleCompra.id= this.obtenerNuevoIdDetalleCompra();
      this.detalleCompra.plato=plato;
      this.detalleCompra.cantidad=1;
      this.detalleCompra.precio=plato.precio;
      this.detalleCompra.total=plato.precio*this.detalleCompra.cantidad;

      this.compra.listaDetalleCompra.push(this.detalleCompra)

      localStorage.setItem("carrito", JSON.stringify(this.compra));
      alert("se agrego un plato")
    }





  }

  obtenerNuevoIdDetalleCompra():number{
    let mayorId:number=0;
    if(localStorage.getItem("carrito")){
      let compra:Compra =  JSON.parse(localStorage.getItem("carrito")!)
      let listaDetaComp:DetalleCompra[] = compra.listaDetalleCompra;
      listaDetaComp.map(d=>{

        if(d.id!==undefined){
          if(d.id>mayorId){
            mayorId=d.id
          }
        }

      })
    }

    mayorId++;
    return mayorId;
  }


}
