import { Component } from '@angular/core';

@Component({
  selector: 'my-todo-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
})
export class AppComponent {

  newTodo: string;
  listTodos: any;

  constructor() {
    this.listTodos = [];
  }

  onSubmit() {
    this.listTodos.push(this.newTodo);
    this.newTodo = '';
  }

  deleteTodo(index: number) {
    console.log(index);
    if (confirm("Voulez-vous réellement supprimer ?")) {
      this.listTodos.splice(index, 1);
    }
  }


}
