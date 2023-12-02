export interface Cliente {
  id:        number;
  name:      string;
  apellido:  string;
  correo:    string;
  password?:  string;
  direccion: string;
  telefono:  string;
}
