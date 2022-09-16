import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  today: string = '';
  locale: Locale = id;
  constructor() { }

  ngOnInit(): void {
  }

}
