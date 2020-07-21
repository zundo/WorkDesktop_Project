import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  theme: string;
  sujet: number;
  statut: string;
  collaborateur_mMme: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sujet: 1, theme: 'Hydrogen', statut: 'H', collaborateur_mMme: 'Moi'},
  {sujet: 2, theme: 'Helium', statut: 'He', collaborateur_mMme: 'Moi'},
  {sujet: 3, theme: 'Lithium', statut: 'Li', collaborateur_mMme: 'Moi'},
  {sujet: 4, theme: 'Beryllium', statut: 'Be', collaborateur_mMme: 'Moi'},
  {sujet: 5, theme: 'Boron', statut: 'B', collaborateur_mMme: 'Moi'},
  {sujet: 6, theme: 'Helium', statut: 'He', collaborateur_mMme: 'Moi'},
  {sujet: 7, theme: 'Lithium', statut: 'Li', collaborateur_mMme: 'Moi'},
  {sujet: 8, theme: 'Beryllium', statut: 'Be', collaborateur_mMme: 'Moi'},
  {sujet: 9, theme: 'Boron', statut: 'B', collaborateur_mMme: 'Moi'},
];
@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss']
})
export class CollaborateursComponent implements OnInit {

  constructor() { }

  
  displayedColumns: string[] = ['sujet', 'theme', 'statut', 'collaborateur_mMme'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
