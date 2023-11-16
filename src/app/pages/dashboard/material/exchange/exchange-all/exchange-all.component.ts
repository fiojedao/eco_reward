import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MaterialExchangeModel } from 'src/models/MaterialExchangeModel';

@Component({
  selector: 'app-exchange-all',
  templateUrl: './exchange-all.component.html',
  styleUrls: ['./exchange-all.component.css']
})
export class ExchangeAllComponent {
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Recycling_Center', 'Exchange_Material_Details', 'exchange_date', 'acciones'];
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listCenter();
  }
  ngAfterViewInit(): void {
    this.listCenter();
  }
  listCenter() {
    this.gService
      .list('materialexchange/')
      // pipe
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response as MaterialExchangeModel;
        debugger
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }  
  
  exchangeDetail(id: number) {

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
