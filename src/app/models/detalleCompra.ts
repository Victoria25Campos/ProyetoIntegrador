import { Plato } from "../plato/interfaces/plato";
import { Compra } from "./compra";

export interface DetalleCompra {
  id?:       number;
  cantidad: number;
  precio:   number;
  total:    number;
  plato:    Plato;
}
