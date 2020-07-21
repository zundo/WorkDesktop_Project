import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  theme: string;
  sujet: string;
  statut: string;
  collaborateur_mMme: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sujet: 'Projet 1', theme: 'Hydrogen', statut: 'H', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 2', theme: 'Helium', statut: 'He', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 1', theme: 'Lithium', statut: 'Li', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 3', theme: 'Beryllium', statut: 'Be', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 1', theme: 'Boron', statut: 'B', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 3', theme: 'Helium', statut: 'He', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 1', theme: 'Lithium', statut: 'Li', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 5', theme: 'Beryllium', statut: 'Be', collaborateur_mMme: 'Moi'},
  {sujet: 'Projet 4', theme: 'Boron', statut: 'B', collaborateur_mMme: 'Moi'},
];

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {


  constructor() { }

  displayedColumns: string[] = ['sujet', 'theme', 'statut', 'collaborateur_mMme'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
