// Import ViewChild and AfterViewInit
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-exchange-detail',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.css']
})
export class ExchangeDetailComponent implements AfterViewInit { // Implement AfterViewInit

  exchangeData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  
  displayedColumns: string[] = ['material_name', 'quantity', 'material_price', 'subtotal', 'eco_coins'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.loadData(Number(id));
    }
  }

  ngAfterViewInit() {
    // Move the paginator setup here
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.exchangeData.exchange_details.length;
    this.paginator.pageSizeOptions = [5, 10, 25];
  }

  loadData(id: number) {
    this.gService
      .get('materialexchange', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.exchangeData = data;
        this.dataSource = new MatTableDataSource(this.exchangeData.exchange_details);
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
