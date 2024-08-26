import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// material : 
import { MatFormFieldModule, MatError, MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from './table/table.component';
import MendeleevData from './data/MendeleevData.json';  // Adjust the path if necessary
import StaffOverviewData from './data/StaffOverviewData.json';  // Adjust the path if necessary
import ViewFormsData from './data/ViewFormsData.json';  // Adjust the path if necessary

export interface MendeleevDataStructure {
  id: string;
  name: string;
  progress: string;
  color: string;
  discoverer: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
})
export class AppComponent  {

  
  dataRawMendeleev = MendeleevData as any[];
  dataRawStaffOverview = StaffOverviewData as any[];
  dataRawViewForms = ViewFormsData as any[];


  functionForSelectedRows = (rows:any)=>{ console.log("we handle those rows : ", rows) }


}