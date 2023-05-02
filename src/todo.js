import { saveTodoItem, getTodoItems } from './core/storage';

export default class ToDo {
  constructor() {
    this.observers = [];
  }

  getTodoList() {
    return getTodoItems();
  }

  setTodoItem(todo) {
    const item = { content: todo, checked: false };
    saveTodoItem(item);
    this.observers.forEach(observer => {
      observer(getTodoItems());
    });
  }

  subscribe(cb) {
    this.observers.push(cb);
    cb(getTodoItems());
  }
}
