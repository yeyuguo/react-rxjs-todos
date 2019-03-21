import 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';

import Todo from '../models/todoModel';

import { setupRxDevtools } from 'rx-devtools/rx-devtools';
import 'rx-devtools/add/operator/debug';
setupRxDevtools();

const initialTodos = JSON.parse(localStorage.getItem('react-rxjs-todos')) || [];


class TodoService {

    constructor() {

        this.update$ = new BehaviorSubject(todos => todos);

        console.log('this.update$.value(): ', this.update$.value());
        // this.update$ = new ReplaySubject(todos => todos);
        this.create$ = new Subject();
        // this.create$ = new ReplaySubject(1);
        this.modify$ = new Subject();
        this.remove$ = new Subject();
        this.removeCompleted$ = new Subject();
        this.toggle$ = new Subject();
        this.toggleAll$ = new Subject();


        this.createTodo$ = new Subject();
        this.modifyTodo$ = new Subject();
        this.removeTodo$ = new Subject();
        this.removeCompletedTodos$ = new Subject();
        this.toggleTodo$ = new Subject();
        this.toggleAllTodos$ = new Subject();


        this.todos$ = this.update$
            .debug('update')
            .scan(
                (todos, operation) => {
                    console.log('operation: ', operation);
                    return operation(todos)
                },
                initialTodos)
            .publishReplay(1)
            .refCount();

        this.todos$.forEach(todos => localStorage.setItem('react-rxjs-todos', JSON.stringify(todos)));

        this.create$
            .debug('create')
            .map(todo => todos => todos.concat(todo))
            .subscribe(this.update$);


        this.modify$
            .debug('modify')
            .map(({ uuid, newTitle }) => todos => {
                const targetTodo = todos.find(todo => todo.id === uuid);
                console.log('targetTodo: ', targetTodo);
                targetTodo.title = newTitle;
                return todos;
            })
            .subscribe(this.update$);


        this.remove$
            .debug('remove')
            .map(uuid => todos => todos.filter(todo => todo.id !== uuid))
            .subscribe(this.update$);

        this.removeCompleted$
            .debug('removeCompleted')
            .map(() => todos => todos.filter(todo => !todo.completed))
            .subscribe(this.update$);

        this.toggle$
            .debug('toggle')
            .map(uuid => todos => {
                const targetTodo = todos.find(todo => todo.id === uuid);
                targetTodo.completed = !targetTodo.completed;
                return todos;
            })
            .subscribe(this.update$);

        this.toggleAll$
            .debug('toggleAll')
            .map(completed => todos => {
                todos.forEach(todo => todo.completed = completed);
                return todos;
            })
            .subscribe(this.update$);

        this.createTodo$
            .debug('createTodo')
            .subscribe(this.create$);

        this.modifyTodo$
            .debug('modifyTodo')
            .subscribe(this.modify$);

        this.removeTodo$
            .debug('removeTodo')
            .subscribe(this.remove$);

        this.removeCompletedTodos$
            .debug('removeCompletedTodos')
            .subscribe(this.removeCompleted$);

        this.toggleTodo$
            .debug('toggleTodo')
            .subscribe(this.toggle$);

        this.toggleAllTodos$
            .debug('toggleAllTodos')
            .subscribe(this.toggleAll$);

    }

    add(title) {
        this.createTodo$.next(new Todo(title));
    }

    remove(uuid) {
        this.removeTodo$.next(uuid);
    }

    removeCompleted() {
        this.removeCompletedTodos$.next();
    }

    toggle(uuid) {
        this.toggleTodo$.next(uuid);
    }

    toggleAll(completed) {
        this.toggleAllTodos$.next(completed);
    }

    update(uuid, newTitle) {

        console.log('this.modifyTodo$: ', this.modifyTodo$);
        this.modifyTodo$.next({ uuid, newTitle });
    }

}

export default new TodoService();