import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../Vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  marcasContador: Array<{ marca: string, contador: number }> = [];
  constructor(private readonly vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.getVehiculos();
  }
  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      this.contarVehiculosPorMarca();
    });
  }
  contarVehiculosPorMarca(): void {
    this.marcasContador = [];
    const marcasMap = new Map<string, number>();
  
    this.vehiculos.forEach(vehiculo => {
      if (marcasMap.has(vehiculo.marca)) {
        marcasMap.set(vehiculo.marca, marcasMap.get(vehiculo.marca)! + 1);
      } else {
        marcasMap.set(vehiculo.marca, 1);
      }
    });
  
    this.vehiculos.forEach(vehiculo => {
      if (!this.marcasContador.some(entry => entry.marca === vehiculo.marca)) {
        this.marcasContador.push({ marca: vehiculo.marca, contador: marcasMap.get(vehiculo.marca)! });
      }
    });
  }
}
