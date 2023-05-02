import { saveTodoItem, getTodoItems, getTodoCount, changeTodoTaskDone } from './core/storage';

export default class ToDo {
  constructor() {
    this.observers = [];
  }

  getTodoList() {
    return getTodoItems();
  }

  getTotalCount() {
    return getTodoCount();
  }

  setTodoItem(todo) {
    const dateId = new Date().getTime();
    const item = { content: todo, done: false, id: dateId };
    saveTodoItem(item);
    this.observers.forEach(observer => {
      observer(getTodoItems());
    });
  }

  onClickDoneCheck(id, done) {
    changeTodoTaskDone(id, done);
  }

  subscribe(cb) {
    this.observers.push(cb);
    cb(getTodoItems());
  }
}
