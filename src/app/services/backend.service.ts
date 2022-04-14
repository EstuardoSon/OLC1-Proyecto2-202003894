import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  URL:string='http://127.0.0.1:4000';

  ejecutar(codigo: any){
    return this.http.post(`${this.URL}/Codigo`,codigo)
  }

  obtenerAnalisis(){
    return this.http.get(`${this.URL}/Codigo`)
  }

  reporteError(){
    return this.http.get(`${this.URL}/Error`)
  }

  reporteAST(){
    return this.http.get(`${this.URL}/AST`)
  }

  reporteSimbolos(){
    return this.http.get(`${this.URL}/Simbolos`)
  }
}
