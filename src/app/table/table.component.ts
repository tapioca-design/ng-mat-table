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
}

// export interface StaffOverviewData {
//   id: string
//   form: string
//   quantity: number
//   status: string[]
// }

// const ELEMENT_DATA: MendeleevData[] = data as MendeleevData[];

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
  dataRaw = input<any[]>();

  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'color'];
  // dataSource = new MatTableDataSource<MendeleevData>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<any>(this.data);
  dataSource = new MatTableDataSource<MendeleevData>();
  /*
  colorList: string[] = Array.from(new Set(ELEMENT_DATA.map(item => item.color))).sort((a, b) => a.localeCompare(b));
  selection = new SelectionModel<MendeleevData>(true, []);
  */
  colorList?: string[];
  

  selection = new SelectionModel<MendeleevData>(true, []);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue: string = '';

  /* data ******************** */

  // control = input.required<FormControl<string | number | null>>();
  // label = input<string>();
  // placeholder = input<string>('');
  // suffix = input<string>('');
  // type = input<InputType>('text');
  // previousLabel = input<string>();
  // previousValue = input<string | number | null>();
  // previousSuffix = input<string>('');

  /* data ******************** */

  selectedColors = new FormControl<string[]>([]); // Multiple selection control for colors

  ngOnInit() {

    // this.dataSource = this.data
    this.dataSource.data = this.dataRaw() as any[];

    this.colorList = Array.from(new Set((this.dataRaw() as any[]).map(item => item.color))).sort((a, b) => a.localeCompare(b));

    // Initialize the filter predicate to account for both filters
    // this.dataSource.filterPredicate = (data: MendeleevData, filter: string) => {
    this.dataSource.filterPredicate = (data: MendeleevData, filter: string) => {
      const [nameFilter, colorsFilter] = filter.split('$');
      const matchName = data.name.toLowerCase().includes(nameFilter);
      const selectedColors = colorsFilter ? colorsFilter.split(',') : [];
      const matchColor = selectedColors.length === 0 || selectedColors.includes(data.color);
      return matchName && matchColor;
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

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = filterValue;
    this.applyFilter();
  }

  applyFilter() {
    // Combine both filters into a single string, separating by $
    const colorFilterString = this.selectedColors.value?.join(',');
    this.dataSource.filter = `${this.filterValue}$${colorFilterString}`;
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