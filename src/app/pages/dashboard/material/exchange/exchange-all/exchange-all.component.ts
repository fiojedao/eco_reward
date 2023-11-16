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
  userId: number = 3;
  userIRole: number = 3;
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

  ngAfterViewInit() {
    // Move the paginator setup here
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.datos.length;
    this.paginator.pageSizeOptions = [5, 10, 25];
  }

  listCenter() {
    this.gService
      .list(`materialexchange/exchangesByUserid/${this.userId}`)
      // pipe
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response as MaterialExchangeModel;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
      });
  } 
   
  
  exchangeDetail(id: number) {
    this.router.navigate(['home', 'material-exchange', id]);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
