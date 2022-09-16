import { TodosRoutingModule } from './employee/todos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    TodosRoutingModule
  ]
})
export class PagesModule { }
