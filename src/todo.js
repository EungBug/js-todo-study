import StorageUtil from './core/storage';

export default class ToDo extends StorageUtil {
  constructor() {
    super('ToDoList');
    this.observers = [];
  }

  getTodoList() {
    return this.getDataList();
  }

  getTotalCount() {
    return this.getListSize();
  }

  setTodoItem(todo) {
    const dateId = new Date().getTime();
    const item = { content: todo, done: false, id: dateId };
    this.setDataInList(item);
    this.observers.forEach(observer => {
      observer(this.getDataList());
    });
  }

  onClickDoneCheck(id, done) {
    this.updateDataById(id, 'done', done);
  }

  deleteTodoItem(id) {
    this.deleteDataById(id);
    this.observers.forEach(observer => {
      observer(this.getDataList());
    });
  }

  subscribe(cb) {
    this.observers.push(cb);
    cb(this.getDataList());
  }
}
