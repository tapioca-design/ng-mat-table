import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type BooleanInput } from '@angular/cdk/coercion';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, type FormControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatSuffix,
} from '@angular/material/form-field';
// import { MatIcon } from '@angular/material/icon';
// import { MatInput } from '@angular/material/input';
import { MatTable } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatSortModule,
    MatFormField,
    MatError,
    // MatInput,
    MatIconButton,
    // MatIcon,
    MatTable,
    MatSuffix,
    DecimalPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'matTableTest1';

  // tableDataSource = ['userName', 'age'];

  // private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort!: MatSort;

  onSortChange(event: Sort) {
    console.log('Sort event:', event);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}
