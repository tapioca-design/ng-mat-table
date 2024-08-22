import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatSuffix,
} from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

const ELEMENT_DATA: UserData[] = [
  { id: '1', name: 'Hydrogen', progress: '10%', color: 'lightblue' },
  { id: '2', name: 'Helium', progress: '20%', color: 'lightgreen' },
  { id: '3', name: 'Lithium', progress: '30%', color: 'lightpink' },
  { id: '4', name: 'Beryllium', progress: '40%', color: 'lightcoral' },
  { id: '5', name: 'Boron', progress: '50%', color: 'lightyellow' },
  { id: '6', name: 'Carbon', progress: '60%', color: 'lightgray' },
  { id: '7', name: 'Nitrogen', progress: '70%', color: 'lightcyan' },
  { id: '8', name: 'Oxygen', progress: '80%', color: 'lightseagreen' },
  { id: '9', name: 'Fluorine', progress: '90%', color: 'lightgoldenrodyellow' },
  { id: '10', name: 'Neon', progress: '100%', color: 'lightsteelblue' },
  { id: '11', name: 'Sodium', progress: '15%', color: 'lightsalmon' },
  { id: '12', name: 'Magnesium', progress: '25%', color: 'lightcoral' },
  { id: '13', name: 'Aluminum', progress: '35%', color: 'lightgreen' },
  { id: '14', name: 'Silicon', progress: '45%', color: 'lightpink' },
  { id: '15', name: 'Phosphorus', progress: '55%', color: 'lightskyblue' },
  { id: '16', name: 'Sulfur', progress: '65%', color: 'lightslategrey' },
  { id: '17', name: 'Chlorine', progress: '75%', color: 'lightyellow' },
  { id: '18', name: 'Argon', progress: '85%', color: 'lightblue' },
  { id: '19', name: 'Potassium', progress: '95%', color: 'lightgreen' },
  { id: '20', name: 'Calcium', progress: '50%', color: 'lightcoral' },
  { id: '21', name: 'Scandium', progress: '60%', color: 'lightpink' },
  { id: '22', name: 'Titanium', progress: '70%', color: 'lightseagreen' },
  { id: '23', name: 'Vanadium', progress: '80%', color: 'lightcyan' },
  { id: '24', name: 'Chromium', progress: '90%', color: 'lightsteelblue' },
  { id: '25', name: 'Manganese', progress: '100%', color: 'lightgoldenrodyellow' },
  { id: '26', name: 'Iron', progress: '20%', color: 'lightyellow' },
  { id: '27', name: 'Cobalt', progress: '30%', color: 'lightblue' },
  { id: '28', name: 'Nickel', progress: '40%', color: 'lightgreen' },
  { id: '29', name: 'Copper', progress: '50%', color: 'lightcoral' },
  { id: '30', name: 'Zinc', progress: '60%', color: 'lightgray' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatSortModule,
    MatFormField,
    MatError,
    MatIconButton,
    MatTable,
    MatSuffix,
    DecimalPipe,
    MatCheckboxModule,
    MatInputModule,
    MatPaginator,
    MatPaginatorModule,
    FormsModule,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterValue: string = '';

  ngOnInit() {
    // Other initialization code if needed
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
