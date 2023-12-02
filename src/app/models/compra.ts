import { Cliente } from "./cliente";
import { DetalleCompra } from "./detalleCompra";

export interface Compra {
  id:      number;
  fecha:   Date;
  total:   number;
  cliente: Cliente;
  listaDetalleCompra : DetalleCompra[];
}
