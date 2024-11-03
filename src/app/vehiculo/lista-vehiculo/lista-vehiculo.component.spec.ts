import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ListaVehiculoComponent } from './lista-vehiculo.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../Vehiculo';
import { By } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';

describe('ListaVehiculoComponent', () => {
  let component: ListaVehiculoComponent;
  let fixture: ComponentFixture<ListaVehiculoComponent>;
  let vehiculoServiceMock: any;

  const vehiculosMock: Vehiculo[] = Array.from({ length: 3 }, () => new Vehiculo(
    faker.number.int(),
    faker.vehicle.manufacturer(),
    faker.vehicle.model(),
    faker.vehicle.type(),
    faker.number.int({ min: 1900, max: 2024 }),
    faker.number.int({ min: 0, max: 200000 }),
    faker.vehicle.color(),
    faker.image.avatar()
  ));

  beforeEach(waitForAsync(() => {
    vehiculoServiceMock = jasmine.createSpyObj('VehiculoService', ['getVehiculos']);
    vehiculoServiceMock.getVehiculos.and.returnValue(of(vehiculosMock));

    TestBed.configureTestingModule({
      declarations: [ListaVehiculoComponent],
      providers: [provideHttpClientTesting(),
      { provide: VehiculoService, useValue: vehiculoServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla con tres filas más el encabezado', () => {
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(tableRows.length).toBe(3);

    const tableHeaders = fixture.debugElement.queryAll(By.css('table thead tr th'));
    expect(tableHeaders.length).toBeGreaterThan(0);
  });

  it('debería llamar a vehiculoService.getVehiculos() al inicializar el componente', () => {
    expect(vehiculoServiceMock.getVehiculos).toHaveBeenCalled();
  });

  it('debería contar los vehículos por marca', () => {
    expect(component.marcasContador.length).toBeGreaterThan(0);
  });

  it('deberia estar presente el banner del vehiculo', () => {
    const imagen = fixture.debugElement.query(By.css('img'));
    expect(imagen).toBeTruthy();
  });

  it('debería mostrar los datos correctos en las filas de la tabla', () => {
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    tableRows.forEach((row, index) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toContain(vehiculosMock[index].marca);
      expect(cells[1].nativeElement.textContent).toContain(vehiculosMock[index].linea);
      expect(cells[2].nativeElement.textContent).toContain(vehiculosMock[index].modelo.toString());
    });
  });

  it('debería mostrar el conteo correcto de vehículos por marca', () => {
    fixture.detectChanges();
    const marcasContador = component.marcasContador;
    marcasContador.forEach(item => {
      const marcaCount = vehiculosMock.filter(v => v.marca === item.marca).length;
      expect(item.contador).toBe(marcaCount);
    });
  });
});