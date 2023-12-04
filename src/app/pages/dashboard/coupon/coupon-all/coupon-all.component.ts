import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coupon-all',
  templateUrl: './coupon-all.component.html',
  styleUrls: ['./coupon-all.component.css'],
})
export class CouponAllComponent {
  isSuperAdmin: boolean = false;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filteredNameCenter: any;
  filteredProvinceCenter: any;
  filteredMaterialCenter: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'start_validity_date',
    'end_validity_date',
    'acciones',
  ];

  constructor(
    private gService: GenericService,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
    this.listCoupons();
  }

  listCoupons() {
    this.gService
      .list('couponexchange/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        this.filteredNameCenter = this.datos;
        this.dataSource = new MatTableDataSource(this.filteredNameCenter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.datos);
      });
  }
  createCoupon() {
    this.router.navigate(['home', 'coupon', 'create']);
  }
  couponDetail(id: number) {
    this.router.navigate(['home', 'coupon', id]);
  }
  updateCoupon(id: number) {
    this.router.navigate(['home', 'coupon', 'update', id]);
  }

  formattedDate(date: string): string {
    const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formatted || '';
  }
}
