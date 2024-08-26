import { Component, OnInit, ViewChild, AfterViewInit, booleanAttribute, contentChild, inject, input, } from '@angular/core';
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
import { UniquePipe } from '../unique.pipe';
import { SortAlphabeticallyPipe } from '../sort-alphabetically.pipe';

// export interface MendeleevData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
//   [key: string]: any;
// }



@Component({
  selector: 'ec-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    // Import necessary Angular modules
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    UniquePipe,
    SortAlphabeticallyPipe
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  dataRaw = input<any[]>();  // Signal input for raw data
  propertiesSearchableWithInputText = input<string[]>();  // Signal input for searchable properties with text input
  propertiesSearchableWithSelectMenu = input<string[]>();  // Signal input for searchable properties with select menu

  // displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'color', 'discoverer'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  colorList?: string[];
  selection = new SelectionModel<any>(true, []);
  filterValues: { [key: string]: string } = {}; // To hold the current filter values
  selectedOptions: { [key: string]: FormControl<string[] | null> } = {}; // Dynamic controls for multi-select menus

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /* hooks ********************** */

  ngOnInit() {
    // Initialize data from signal
    this.dataSource.data = this.dataRaw() as any[];
  
    // Dynamically determine the columns from the JSON keys, excluding "select"
    if (this.dataSource.data.length > 0) {
      const keys = Object.keys(this.dataSource.data[0]).filter(key => key !== 'select');
      this.displayedColumns = ['select', ...keys]; // Add 'select' manually for the selection column
    }
  
    // Extract unique values for each select menu property
    this.propertiesSearchableWithSelectMenu()?.forEach(property => {
      this.selectedOptions[property] = new FormControl<string[]>([]); // Initialize FormControl for multi-select
  
      // Watch for changes in each select menu
      this.selectedOptions[property].valueChanges.subscribe(() => {
        this.applyFilter();
      });
    });
  
    // Initialize the filter predicate to account for both input text and select menu filters
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = filter.split('_DIVIDER_');
      // Check text inputs
      const textFilterMatches = this.propertiesSearchableWithInputText()?.every((property, index) => {
        return data[property].toString().toLowerCase().includes(filters[index]);
      });
      // Check multi-select menus
      const selectFilterMatches = this.propertiesSearchableWithSelectMenu()?.every((property, index) => {
        const selectedValues = filters[(this.propertiesSearchableWithInputText()?.length || 0) + index];
        return !selectedValues || selectedValues.split(',').includes(data[property]);
      });
      return !!textFilterMatches && !!selectFilterMatches;
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterFromTextInput(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValues[property] = filterValue;
    this.applyFilter();
  }

  applyFilter() {
    const textFilterString = (this.propertiesSearchableWithInputText() ?? []).map(property => this.filterValues[property] || '').join('_DIVIDER_');
    const selectFilterString = (this.propertiesSearchableWithSelectMenu() ?? []).map(property => this.selectedOptions[property].value?.join(',') || '').join('_DIVIDER_');
    // console.log("selectFilterString", selectFilterString);
    this.dataSource.filter = `${textFilterString}_DIVIDER_${selectFilterString}`;
    console.log("dataSource.filter", this.dataSource.filter);
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

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}