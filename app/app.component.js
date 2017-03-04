"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Datastore = require('nedb');
var AppComponent = (function () {
    function AppComponent() {
        this.db = new Datastore({ filename: 'path/to/datafile', autoload: true });
        this.getAll();
        this.getNb();
        this.getNbCompleted();
        this.filter(false);
    }
    // Get all tasks
    AppComponent.prototype.getAll = function () {
        /*this.db.find({}, (err: Error, todos: string[]) => {
          if (err) throw err;
          this.listTodos = todos;
        });*/
        this.filter(this._filter);
    };
    // Get number tasks
    AppComponent.prototype.getNb = function () {
        var _this = this;
        this.db.count({}, function (err, count) {
            if (err)
                throw err;
            _this.nbTodos = count;
        });
    };
    // Get number tasks completed
    AppComponent.prototype.getNbCompleted = function () {
        var _this = this;
        this.db.count({ 'complete': true }, function (err, count) {
            if (err)
                throw err;
            _this.nbTodosCompleted = count;
        });
    };
    AppComponent.prototype.filter = function (filter) {
        var _this = this;
        this.db.find({ 'complete': filter }, function (err, todos) {
            if (err)
                throw err;
            _this.listTodos = todos;
        });
        this._filter = filter;
    };
    AppComponent.prototype.onSubmit = function () {
        var todo = {
            name: this.newTodo,
            complete: false
        };
        this.db.insert(todo);
        this._filter = false;
        this.getAll();
        this.getNb();
        this.newTodo = '';
    };
    AppComponent.prototype.completeTodo = function (id) {
        var _this = this;
        this.db.findOne({ '_id': id }, function (err, todo) {
            if (err)
                throw err;
            if (todo.complete === true) {
                todo.complete = false;
            }
            else {
                todo.complete = true;
            }
            _this.db.update({ _id: id }, { $set: { complete: todo.complete } });
            _this.getAll();
            _this.getNbCompleted();
        });
    };
    AppComponent.prototype.deleteAllTodo = function () {
        if (confirm("Voulez-vous réellement supprimer toute les tâches ?")) {
            this.db.remove({}, { multi: true });
            this.getAll();
            this.getNb();
            this.getNbCompleted();
        }
    };
    AppComponent.prototype.deleteAllTodoCompleted = function () {
        if (confirm("Voulez-vous réellement supprimer toute les tâches terminées ?")) {
            this.db.remove({ 'complete': true }, { multi: true });
            this.getAll();
            this.getNb();
            this.getNbCompleted();
        }
    };
    AppComponent.prototype.deleteTodo = function (id) {
        if (confirm("Voulez-vous réellement supprimer cette tâche ?")) {
            this.db.remove({ '_id': id });
            this.getAll();
            this.getNb();
            this.getNbCompleted();
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-todo-app',
            moduleId: module.id,
            templateUrl: 'app.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map