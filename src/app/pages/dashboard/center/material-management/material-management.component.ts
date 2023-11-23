import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ExchangeService } from 'src/app/services/exchanging.service';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-material-management',
  templateUrl: './material-management.component.html',
  styleUrls: ['./material-management.component.css'],
})
export class MaterialManagementComponent {
  customers: any[] = [];
  materials: any[] = [];
  centerAdmin: any[] = [];
  userLogin: any;
  selectedCustomer: any;
  fecha = new Date();
  isSuperAdmin: boolean = false;
  isCenterAdmin: boolean = false;
  isClient: boolean = false;
  center: any;
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  total = 0;
  qtyItems = 0;

  displayedColumns: string[] = [
    'material',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private exchangeService: ExchangeService,
    private gService: GenericService,
    private router: Router,
    private userService: UserService
  ) {
    this.userLogin = this.userService.getInfo();
    this.loadUser(this.userLogin);
    this.loadCustomers();
    this.loadCenterAdmin();
    this.loadMaterials();
  }

  ngOnInit(): void {
    this.exchangeService.currentDataExchange$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.exchangeService.getTotal();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarCantidad(item: any) {
    this.exchangeService.addExchange(item);
    this.total = this.exchangeService.getTotal();
  }

  /* center's materials */
  loadMaterials() {
    this.gService
      .list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.materials = response;
      });
    console.log(this.materials);
  }

  loadUser(data: any) {
    this.isSuperAdmin = false;
    this.isCenterAdmin = false;
    this.isClient = false;
    const { user, center, isSuperAdmin, isCenterAdmin, isClient } = data;
    if (isSuperAdmin) {
      this.center = undefined;
      this.selectedCustomer = undefined;
    } else if (isCenterAdmin) {
      if (center) {
        this.center = center;
        this.isCenterAdmin = isCenterAdmin;
      } else {
        this.router.navigate(['home']);
      }
    } else if (isClient || user) {
      this.isClient = isClient;
    }
  }

  loadCenterAdmin() {
    this.gService
      .list('user/role/2')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.centerAdmin = response;
      });
  }
  loadCustomers() {
    this.gService
      .list('user/role/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.customers = response;
      });
  }

  setSelectedCenter(user: any) {
    if (user) {
      this.gService
        .get('center/user', user.userID)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.center = data;
        });
    }
  }

  setSelectedCustomer(user: any) {
    if (user) {
      this.selectedCustomer = user;
    }
  }

  ngAfterViewInit() {
    this.userService.userChanges().subscribe((data) => this.loadUser(data));
  }

  onCheckboxChange(event: any, materialId: number) {
    if (event.checked) {
      console.log(`Checkbox con ID ${materialId} fue marcado.`);
      this.loadMaterial(materialId);
    } else {
      this.exchangeService.removeFromCart(materialId);
    }
  }

  loadMaterial(id: any) {
    this.gService
      .get('material/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        /* this.materials = response; */
        this.exchangeService.addExchange(response);
      });
    console.log(this.materials);
  }
}
