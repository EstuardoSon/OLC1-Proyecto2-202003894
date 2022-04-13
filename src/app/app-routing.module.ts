import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'Editor',
    pathMatch:'full'
  },
  {
    path:'Editor',
    component: EditorComponent
  },
  {
    path:'Reporte',
    component: ReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
