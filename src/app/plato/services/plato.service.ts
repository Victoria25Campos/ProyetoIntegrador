import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plato } from '../interfaces/plato';

@Injectable({providedIn: 'root'})
export class PlatoService {
  constructor(private http:HttpClient) {
   }

   private apiUrl:string = 'http://localhost:8090/plato';

   listAll():Observable<Plato[]>{
    const url = `${this.apiUrl}/lista`
    return this.http.get<Plato[]>(url);
   }


   save(data:FormData):Observable<Plato>{
    const url = `${this.apiUrl}/save`
    return this.http.post<Plato>(url, data);
  }

  update(data:FormData):Observable<Plato>{
    const url = `${this.apiUrl}/update`
    return this.http.post<Plato>(url, data);
  }

  delete(id:number):Observable<Plato>{
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete<Plato>(url);
  }

  searchById(id:number):Observable<Plato>{
    const url = `${this.apiUrl}/search/${id}`
    return this.http.get<Plato>(url);
  }

  getImage(filename: string): Observable<Blob> {
    const url = `${this.apiUrl}${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }




}
