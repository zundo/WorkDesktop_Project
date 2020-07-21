import { Component, OnInit, Input } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() id: string;
  @Input() appearance: MatFormFieldAppearance;

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

}
