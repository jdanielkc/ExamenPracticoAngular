import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListaVehiculoComponent } from './lista-vehiculo/lista-vehiculo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ListaVehiculoComponent],
  declarations: [ListaVehiculoComponent]
})
export class VehiculoModule { }
