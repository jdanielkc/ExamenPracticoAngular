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

  
});