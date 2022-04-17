import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public salida: string;
  public contenido: string;
  public guardar: string;

  constructor(private backend: BackendService) {
    this.salida = "";
    this.guardar = "";
  }

  ngOnInit(): void {
  }

  @ViewChild('file') archivo: ElementRef;
  @ViewChild('codigo') codigo: ElementRef;
  @ViewChild('nombreA') nombreA: ElementRef;

  cargarArchivo() {
    let archivo = this.archivo.nativeElement.files[0]
    this.guardar = String(archivo.name).replace(".cst", "");
    console.log(this.guardar);
    let fileReader = new FileReader();
    this.codigo.nativeElement.value = "";
    try {
      fileReader.readAsText(archivo);
      fileReader.onload = async (e: any) => {
        this.codigo.nativeElement.value += fileReader.result;
      }
    } catch (e) {
      alert("Error en la Lectura del Archivo")
    }

  }

  ejecutar() {
    this.enviarCodigo();
  }

  generarArchivoBlanco(){
    this.guardar = this.nombreA.nativeElement.value
    this.codigo.nativeElement.value = ""

    this.generarArchivos();
  }

  generarArchivos() {
    var file = new Blob([this.codigo.nativeElement.value], { type: ".cst" });
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.guardar + ".cst";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  verAnalisis() {
    this.backend.obtenerAnalisis().subscribe(
      res => {
        let infoSalida = JSON.parse(JSON.stringify(res))
        this.salida = infoSalida.Codigo
        this.salida += "\n" + infoSalida.Error
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }

  enviarCodigo() {
    let entrada: any = {
      Codigo: this.codigo.nativeElement.value
    }
    this.backend.ejecutar(JSON.parse(JSON.stringify(entrada))).subscribe(
      res => {
        console.log(JSON.parse(JSON.stringify(res)))
        this.verAnalisis();
      },
      err => {
        console.log("Error en la Peticion");
        console.log(err);
      }
    )
  }
}
