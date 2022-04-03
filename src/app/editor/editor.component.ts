import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  public salida:string;

  constructor(private backend:BackendService) { 
    this.salida ="";
  }

  ngOnInit(): void {
  }

  @ViewChild('file') archivo: ElementRef;
  cargarArchivo(){
    let archivo = this.archivo.nativeElement.files[0]
    let fileReader = new FileReader();
    fileReader.readAsText(archivo); 
    fileReader.onload = async (e: any) => {
      console.log(fileReader.result);          
    }
  }

  ejecutar(){
    this.enviarCodigo();
  }

  @ViewChild('codigo') codigo: ElementRef;

  verAnalisis(){
    this.backend.obtenerAnalisis().subscribe(
      res => {
        this.salida = JSON.parse(JSON.stringify(res)).Codigo
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }

  enviarCodigo(){
    let entrada:any = {
      Codigo : this.codigo.nativeElement.value
    }
    this.backend.ejecutar(JSON.parse(JSON.stringify(entrada))).subscribe(
      res => {
        console.log(JSON.parse(JSON.stringify(res)))
        this.verAnalisis();
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }
}
