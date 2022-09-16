import { TodoFormComponent } from './employee/emp-form/todo-form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../shared/guard/route.guard';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'employee',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () => import('./employee/todos.module').then(m => m.TodosModule)
  },
  {
    path: 'form',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: TodoFormComponent
  },
  {
    path: 'detail',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
