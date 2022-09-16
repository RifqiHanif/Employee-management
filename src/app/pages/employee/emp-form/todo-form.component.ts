import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { TodoField } from '../model/todo-field.model';
import { Todo } from '../model/todo.model';
import { TodosService } from '../services/todos.service';
import { id } from 'date-fns/locale'

const TODO_URL = '/form';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todo?: Todo;
  today: string = '';
  locale: Locale = id;
  id?: number; // bisa di pake untuk sweetAlert2
  subcriber?: Observer<any>;
  field: typeof TodoField = TodoField;
  todoForm: FormGroup = new FormGroup({
    [TodoField.ID]: new FormControl(null),
    [TodoField.USERNAME]: new FormControl(null, [Validators.required]),
    [TodoField.FIRSTNAME]: new FormControl(null, [Validators.required]),
    [TodoField.LASTNAME]: new FormControl(null, [Validators.required]),
    [TodoField.EMAIL]: new FormControl(null, [Validators.required]),
    [TodoField.BOD]: new FormControl(null, [Validators.required]),
    [TodoField.SALARY]: new FormControl(null, [Validators.required]),
    [TodoField.GROUP]: new FormControl(null, [Validators.required]),
    [TodoField.DESC]: new FormControl(null, [Validators.required]),
    [TodoField.STATUS]: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly todoService: TodosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => {
        return params['id'] ? +params['id'] : null
      })
    ).subscribe((id: any) => {
      this.todoService.get(id).subscribe((todo) => {
        this.todo = todo
      })
      this.id = id; // pengecekan sweetAlert2
      this.setFormValue();
    });
  }

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    // if (!todo.isDone) {
    //   todo.isDone = false;
    // }
    this.todoService.save(todo).subscribe();
    if (this.id) {
      Swal.fire({
        icon: 'success',
        title: `Todo ${todo.username} telah di ubah!`,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: `Todo ${todo.username} telah di tambah!`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.todoForm.reset();
    this.router.navigateByUrl(TODO_URL);
  }

  setFormValue(): void {
    if (this.todo) {
      this.todoForm.get(TodoField.ID)?.setValue(this.todo.id);
      this.todoForm.get(TodoField.USERNAME)?.setValue(this.todo.username);
      this.todoForm.get(TodoField.FIRSTNAME)?.setValue(this.todo.firstName);
      this.todoForm.get(TodoField.LASTNAME)?.setValue(this.todo.lastName);
      this.todoForm.get(TodoField.EMAIL)?.setValue(this.todo.email);
      this.todoForm.get(TodoField.BOD)?.setValue(this.todo.birthDate);
      this.todoForm.get(TodoField.SALARY)?.setValue(this.todo.basicSalary);
      this.todoForm.get(TodoField.STATUS)?.setValue(this.todo.status);
      this.todoForm.get(TodoField.DESC)?.setValue(this.todo.description);
    } else if (this.todoForm) {
      this.todoForm.reset()
    }
  }

  isFieldValid(todoField: TodoField): string {
    const control: AbstractControl = this.todoForm.get(todoField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
