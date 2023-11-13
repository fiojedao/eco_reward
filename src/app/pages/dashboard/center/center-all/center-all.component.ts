import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-center-all',
  templateUrl: './center-all.component.html',
  styleUrls: ['./center-all.component.css'],
})
export class CenterAllComponent {
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'operating_hours', 'acciones'];

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
      .list('center/')
      // pipe
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  centerDetail(id: number) {
    this.router.navigate(['home', 'center', id]);
  }

  createCenter() {
    this.router.navigate(['home', 'center', 'create']);
  }
  updateCenter(id: number) {
    this.router.navigate(['home', 'center', 'update', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
