import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public contenidoDiv: string = "";

  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
  }

  verErrores() {
    this.backend.reporteError().subscribe(
      res => {
        let infoSalida = JSON.parse(JSON.stringify(res))
        this.contenidoDiv = '<div>' + infoSalida.Codigo + '</div>'
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }

  verAST() {
    this.backend.reporteAST().subscribe(
      res => {
        let infoSalida = JSON.parse(JSON.stringify(res))
        this.contenidoDiv = '<h2>Realice las correciones de errores Sintacticos para tener el AST adecuado</h2>\n<div>' + infoSalida.Codigo + '</div>'
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }

  verSimbolos() {
    this.backend.reporteSimbolos().subscribe(
      res => {
        let infoSalida = JSON.parse(JSON.stringify(res))
        this.contenidoDiv = '<div>' + infoSalida.Codigo + '</div>'
      },
      err => {
        console.log("Error en la Peticion");
      }
    )
  }
}
