import Component from './core/Component';
import ToDoManager from './todo';

const todoManager = new ToDoManager();
export default class App extends Component {
  render() {
    const todoList = new TodoList([]);

    todoManager.subscribe(todos => {
      if (todos) {
        todoList.props.todoList = todos;
        todoList.render();
      }
    });

    const header = new TodoHeader().el;
    const inputBox = new TodoInput({
      addHandler: todo => {
        todoManager.setTodoItem(todo);
      }
    }).el;

    this.el.append(header, inputBox, todoList.el);
  }
}

// ToDo Header
class TodoHeader extends Component {
  constructor() {
    super({
      tagName: 'header'
    });
  }

  render() {
    this.el.innerHTML = `
      <img src='/assets/rocket.png' alt='Rocket'/>
      <h1><span>To</span>Do</h1>
    `;
  }
}

// ToDo를 입력할 인풋
class TodoInput extends Component {
  constructor(addHandler) {
    super({
      props: addHandler
    });
  }
  render() {
    const inputEl = document.createElement('input');
    inputEl.placeholder = '오늘 내가 해야 할 일은?';

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('btn');
    submitBtn.textContent = 'Do!';
    submitBtn.addEventListener('click', () => {
      this.props.addHandler(inputEl.value);
      inputEl.value = '';
    });

    this.el.classList.add('input-box');
    this.el.append(inputEl, submitBtn);
  }
}
// ToDo 목록
class TodoList extends Component {
  constructor(todoList) {
    super({
      tagName: 'ul',
      props: { todoList }
    });
  }

  render() {
    const { todoList } = this.props;

    this.el.innerHTML = ``; // 목록 초기화
    this.el.classList.add('todo__list');

    todoList?.map(todo => {
      const item = new TodoItem(todo).el;
      this.el.append(item);
    });
  }
}

// ToDo Item
class TodoItem extends Component {
  constructor(item) {
    super({
      tagName: 'li',
      props: { item }
      // onChangeDone
    });
  }
  render() {
    const { item } = this.props;
    this.el.innerHTML = `
      <input type='checkbox' id='${item.id}'/>
      <label for='${item.id}'></label>
      <p class='content'>${item.content}</p>
      <div class='delete'>delete</div>
    `;

    const contentEl = this.el.querySelector('.content');
    if (item.done) {
      contentEl.classList.add('done');
    }

    const checkbox = this.el.querySelector('input');
    checkbox.checked = item.done;

    checkbox.addEventListener('click', event => {
      // done 여부
      todoManager.onClickDoneCheck(item.id, event.target.checked);
      contentEl.classList.toggle('done');
    });
  }
}

// 삭제버튼
// 완료 체크 버튼
