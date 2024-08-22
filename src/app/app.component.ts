import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// material : 
import { MatFormFieldModule, MatError,  MatFormField,  MatSuffix,} from '@angular/material/form-field';
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
import {MatSelectModule} from '@angular/material/select';



export interface MendeleevData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

// { id: '1', name: 'Hydrogen', progress: '10%', color: 'lightblue' },
const ELEMENT_DATA: MendeleevData[] = [
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
    // FormsModule,
    // DecimalPipe,

    // MatFormField,
    // MatIconButton,
    // MatSuffix,

    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule,

    MatTableModule,
    MatTable,
    MatSortModule,
    
    MatCheckboxModule,
    
    MatInput,
    MatInputModule,

    MatPaginator,
    MatPaginatorModule,
    
    MatFormFieldModule,
    MatError,

    MatSlideToggleModule
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<MendeleevData>(ELEMENT_DATA);
  // colorList: string[] = ELEMENT_DATA.map(item => item.color); 
  // unique values and sorted alphabetically
  colorList: string[] = Array.from(new Set(ELEMENT_DATA.map(item => item.color))).sort((a, b) => a.localeCompare(b));
  
  // colorList: string[] = this.dataSource.data.map(item => item.color);
  selection = new SelectionModel<MendeleevData>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterValue: string = '';

  ngOnInit() {
    // Other initialization code if needed
    this.selectedColors.valueChanges.subscribe(selectedValues => {
      console.log('selectedValues:', selectedValues);
      this.applyColorFilter(selectedValues);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /*************** */


  selectedColors = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  applyFilter(event: Event) {
    // input text on name column
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // multi select on color column
    // if (this.selectedColors && this.selectedColors.value && this.selectedColors.value.length > 0) {
    //   this.dataSource.filter = this.selectedColors.value;
    // } 
    // pagination
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // applyColorFilter(selectedValues: string[]) {
  applyColorFilter(selectedValues: any) {
    if (selectedValues && selectedValues.length > 0) {
      this.dataSource.data = ELEMENT_DATA.filter(item => selectedValues.includes(item.color));
    } 
    // else {
    //   // If no colors are selected, reset to the full list
    //   this.dataSource.data = ELEMENT_DATA;
    // }
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

  checkboxLabel(row?: MendeleevData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
// export class SelectMultipleExample {
//   toppings = new FormControl('');
//   toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
// }