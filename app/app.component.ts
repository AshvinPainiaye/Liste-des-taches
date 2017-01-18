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

  deleteAllTodo() {
    if (confirm("Voulez-vous réellement supprimer toute les taches ?")) {
      this.listTodos = [];
    }
  }

  deleteTodo(index: number) {
    if (confirm("Voulez-vous réellement supprimer cette tache ?")) {
      this.listTodos.splice(index, 1);
    }
  }


}
