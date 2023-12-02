import { DetalleCompra} from "src/app/models/detalleCompra";

export interface Plato{
  codigo:number,
  nombre:string,
  descripcion:string,
  imagen:string,
  precio:number,
  imageUrl?:string|  ArrayBuffer |null;
}
