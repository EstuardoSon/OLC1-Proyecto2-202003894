import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  public salida:string;
  public contenido:string;

  constructor(private backend:BackendService) { 
    this.salida ="";
  }

  ngOnInit(): void {
  }

  @ViewChild('file') archivo: ElementRef;
  @ViewChild('codigo') codigo: ElementRef;

  cargarArchivo(){
    let archivo = this.archivo.nativeElement.files[0]
    let fileReader = new FileReader();
    this.codigo.nativeElement.value = "";
    try {
      fileReader.readAsText(archivo); 
      fileReader.onload = async (e: any) => {
        console.log(fileReader.result)
        this.codigo.nativeElement.value += fileReader.result;   
      }
    } catch (e) {
      alert("Error en la Lectura del Archivo")
    }
      
  }

  ejecutar(){
    this.enviarCodigo();
  }

  verAnalisis(){
    this.backend.obtenerAnalisis().subscribe(
      res => {
        let infoSalida = JSON.parse(JSON.stringify(res))
        this.salida = infoSalida.Codigo
        this.salida += "\n"+infoSalida.Error
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
