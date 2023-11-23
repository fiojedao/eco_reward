import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { CenterRoutingModule } from './center-routing.module';
import { CenterAllComponent } from './center-all/center-all.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { CenterFormComponent } from './center-form/center-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

@NgModule({
  declarations: [
    CenterAllComponent,
    CenterDetailComponent,
    CenterFormComponent,
    MaterialManagementComponent,
  ],
  imports: [
    CommonModule,
    CenterRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
})
export class CenterModule {}
