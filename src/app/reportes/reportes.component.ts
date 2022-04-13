import { Component, OnInit } from '@angular/core';
import { graphviz } from "d3-graphviz";
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
    this.contenidoDiv = '';
    console.log("hola");
    //graphviz("#graph").renderDot('digraph {a -> b}');
  }
}
