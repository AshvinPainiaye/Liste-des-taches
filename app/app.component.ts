import { Component } from '@angular/core';
import Datastore = require('nedb');

@Component({
  selector: 'my-todo-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
})

export class AppComponent {

  newTodo: string;
  listTodos: any;
  nbTodos: number;
  nbTodosCompleted: number;
  db: any;

  constructor() {
    this.db = new Datastore({ filename: 'path/to/datafile', autoload: true });
    this.getAll();
    this.getNb();
    this.getNbCompleted();
  }


  // Get all tasks
  getAll() {
    this.db.find({}, (err: Error, todos: string[]) => {
      if (err) throw err;
      this.listTodos = todos;
    });
  }


  // Get number tasks
  getNb() {
    this.db.count({}, (err: Error, count: number) => {
      if (err) throw err;
      this.nbTodos = count;
    });
  }


  // Get number tasks completed
  getNbCompleted() {
    this.db.count({ 'complete': true }, (err: Error, count: number) => {
      if (err) throw err;
      this.nbTodosCompleted = count;
      console.log(count);
    });
  }

  onSubmit() {
    var todo: any = {
      name: this.newTodo,
      complete: false
    };
    this.db.insert(todo);
    this.getAll();
    this.getNb();

    this.newTodo = '';
  }


  completeTodo(id: string) {
    this.db.findOne({ '_id': id }, (err: Error, todo: any) => {
      if (err) throw err;
      if (todo.complete === true) {
        todo.complete = false;
      } else {
        todo.complete = true;
      }
      this.db.update({ _id: id }, { $set: { complete: todo.complete } });
      this.getAll();
      this.getNbCompleted();
    });
  }

  deleteAllTodo() {
    if (confirm("Voulez-vous réellement supprimer toute les taches ?")) {
      this.db.remove({}, { multi: true });
      this.getAll();
      this.getNb();
      this.getNbCompleted();
    }
  }

  deleteAllTodoCompleted() {
    if (confirm("Voulez-vous réellement supprimer toute les taches effectuer ?")) {
      this.db.remove({ 'complete': true }, { multi: true });
      this.getAll();
      this.getNb();
      this.getNbCompleted();
    }
  }

  deleteTodo(id: string) {
    if (confirm("Voulez-vous réellement supprimer cette tache ?")) {
      this.db.remove({ '_id': id });
      this.getAll();
      this.getNb();
      this.getNbCompleted();
    }
  }

}
