import { saveTodoItem, getTodoItems, getTodoCount, changeTodoTaskDone, deleteTodoTaskById } from './core/storage';

/**
 * storage.js의 함수들을 import하여 UI 컴포넌트에서 기능마다 필요한 메서드 호출 시
 * storage의 함수들을 호출하고 컴포넌트에서 데이터 변경을 구독 하면 데이터가 변경 시
 * 해당 콜백 함수를 호출해준다.
 */
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

  deleteTodoItem(id) {
    deleteTodoTaskById(id);
    this.observers.forEach(observer => {
      observer(getTodoItems());
    });
  }

  subscribe(cb) {
    this.observers.push(cb);
    cb(getTodoItems());
  }
}
