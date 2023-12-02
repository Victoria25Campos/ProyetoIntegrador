import { Component, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Compra } from 'src/app/models/compra';
import { DetalleCompra } from 'src/app/models/detalleCompra';
import { Plato } from 'src/app/plato/interfaces/plato';
import { CompraService } from 'src/app/services/compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  dtOptions: DataTables.Settings = {};

  listaDetalleCompra:DetalleCompra[]=[];

  plato:Plato={
    "codigo":0,
    "nombre":"",
    "descripcion":"",
    "imagen":"",
    "precio":0,
    "imageUrl":null
  }

  cliente:Cliente= {
    id:        0,
    name:      "",
    apellido:  "",
    correo:    "",
    password:  "",
    direccion: "",
    telefono:  ""
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

  //constructor
  constructor(private serCompra:CompraService){

  }

  ngOnInit(): void {

    this.dtOptions={
      responsive:true,
      pageLength : 5
    }

    this.obtenerListaDetalleCompra();
  }

  obtenerListaDetalleCompra(){

    if(localStorage.getItem("carrito")){
      let carrito = localStorage.getItem("carrito") as string;
      this.compra = JSON.parse(carrito);

      this.listaDetalleCompra=this.compra.listaDetalleCompra;

      if(this.compra.listaDetalleCompra.length>0){
        //calculamos el total de la compra
      let total:number=0;
      this.compra.listaDetalleCompra.map(d=>{
        total+=d.total;
      })
      this.compra.total=total
      }
    }

  }

  disminuirCantidad(detalle:DetalleCompra){
    this.detalleCompra=this.listaDetalleCompra.find(d=>d.id==detalle.id)!;
    if(this.detalleCompra.cantidad>1){
      this.detalleCompra.cantidad--;
      this.detalleCompra.total=this.detalleCompra.cantidad*this.detalleCompra.precio;

      this.listaDetalleCompra.map(d=>{
        if(d.id==this.detalleCompra.id){
          d=this.detalleCompra;
        }
      })
    }
    else{
      this.listaDetalleCompra.splice(this.listaDetalleCompra.indexOf(this.detalleCompra), 1);
    }

    localStorage.setItem("carrito", JSON.stringify(this.compra));

    this.obtenerListaDetalleCompra();
    this.valiarExistenciaElemntosCarrito();
  }

  aumentarCantidad(detalle:DetalleCompra){
    this.detalleCompra=this.listaDetalleCompra.find(d=>d.id==detalle.id)!;


      this.detalleCompra.cantidad++;
      this.detalleCompra.total=this.detalleCompra.cantidad*this.detalleCompra.precio;

      this.listaDetalleCompra.map(d=>{
        if(d.id==this.detalleCompra.id){
          d=this.detalleCompra;
        }
      })

    localStorage.setItem("carrito", JSON.stringify(this.compra));

    this.obtenerListaDetalleCompra();
  }


  valiarExistenciaElemntosCarrito(){
    this.obtenerListaDetalleCompra();
    if(this.listaDetalleCompra.length==0){
      localStorage.removeItem("carrito");
    }
  }

  //la parte mas importante
  //LA COMPRAAAA
  comprar(){
    if(localStorage.getItem("carrito")){
      this.compra= JSON.parse(localStorage.getItem("carrito") as string);

      //verificamos que el carrito tenga detalles
      if(this.compra.listaDetalleCompra.length>0){
        //calculamos el total de la compra
      let total:number=0;
      this.compra.listaDetalleCompra.map(d=>{
        total+=d.total;
      })
      this.compra.total=total

      //corregimos el id de todos los detalles de compra
      this.compra.listaDetalleCompra.map(d=>{
        delete d.id
      })

      //vemos como queda la compra
      console.log("compra antes de guardar", this.compra)

      //guardamos la compra
      this.serCompra.save(this.compra).subscribe(response=>{
        if(response){
          console.log(response)
          //mostramos un mensaje
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra realizada con exito",
            showConfirmButton: false,
            timer: 2500
          });
        }else{
          alert("error en la compra")
        }
      })
      }else{
        //si el carrito no tiene elementos
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No hay platos en el carrito",
          showConfirmButton: false,
          timer: 2500
        });

      }
    }else{
      //si no existe el carrito en el localStorage
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El carrito esta vacio",
        showConfirmButton: false,
        timer: 2500
      });
    }
  }


}
