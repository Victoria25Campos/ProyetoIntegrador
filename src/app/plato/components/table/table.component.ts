import { Component, Input } from '@angular/core';
import { Plato } from '../../interfaces/plato';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dtOptions: DataTables.Settings = {};
  

  @Input()
  listaPlatos:Plato[]=[];

  ngOnInit(): void {

    this.dtOptions={
      responsive:true,
      pageLength : 5
    }
  }



}
