import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  prenom: string;
  nom: string;
  email: string;
  collaborateur_mMme: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nom: 'Ayachia', prenom: 'Khalid', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Brown', prenom: 'James', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Bloum', prenom: 'Isaac', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Ayachi', prenom: 'tyron', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Ballouk', prenom: 'Mounir', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Diallo', prenom: 'El Hadj', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Mac', prenom: 'Apple', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Star', prenom: 'Buck', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
  {nom: 'Boron', prenom: 'evian', email: 'khalid.ayachia@gmail.com', collaborateur_mMme: 'Moi'},
];
@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss']
})
export class CollaborateursComponent implements OnInit {

  constructor() { }

  
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'collaborateur_mMme'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
