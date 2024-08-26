// import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
// import { SelectionModel } from '@angular/cdk/collections';
// import { FormControl } from '@angular/forms';
import { Signal } from '@angular/core';
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

export interface MendeleevData {
  id: string;
  name: string;
  progress: string;
  color: string;
  [key: string]: any;
}

@Component({
  selector: 'ec-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
export class TableComponent implements OnInit, AfterViewInit {
  dataRaw = input<any[]>();  // Signal input for raw data
  propertiesSearchableWithInputText = input<string[]>();  // Signal input for searchable properties
  propertiesSearchableWithSelectMenu = input<string[]>();  // Signal input for select menu properties

  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<MendeleevData>();
  colorList?: string[];
  selection = new SelectionModel<MendeleevData>(true, []);
  filterValues: { [key: string]: string } = {}; // To hold the current filter values
  selectedColors = new FormControl<string[]>([]); // Multiple selection control for colors

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // Initialize data from signal
    this.dataSource.data = this.dataRaw() as MendeleevData[];

    // Extract unique colors for the color filter
    this.colorList = Array.from(new Set(this.dataSource.data.map(item => item.color))).sort();

    // Initialize the filter predicate to account for both input text and color filters
    this.dataSource.filterPredicate = (data: MendeleevData, filter: string) => {
      const filters = filter.split('_DIVIDER_');
      const textFilterMatches = this.propertiesSearchableWithInputText && this.propertiesSearchableWithInputText()?.every((property, index) => {
        return data[property].toString().toLowerCase().includes(filters[index]);
      });
      const selectedColors = filters[this.propertiesSearchableWithInputText()?.length || 0];
      const colorFilterMatches = selectedColors ? selectedColors.split(',').includes(data.color) : true;
    
      return !!textFilterMatches && !!colorFilterMatches; // Ensure boolean values are returned
    };

    // Reapply the filter when the selected colors change
    this.selectedColors.valueChanges.subscribe(() => {
      this.applyFilter();
    });
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
    const filterString = (this.propertiesSearchableWithInputText() ?? []).map(property => this.filterValues[property] || '').join('_DIVIDER_');
    const colorFilterString = this.selectedColors.value?.join(',');
    this.dataSource.filter = `${filterString}_DIVIDER_${colorFilterString}`;
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

  checkboxLabel(row?: MendeleevData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}