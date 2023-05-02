import Component from './core/Component';
import ToDoManager from './todo';

export default class App extends Component {
  render() {
    const list = document.createElement('ul');
    list.classList.add('todo__list');

    const todoManager = new ToDoManager();
    todoManager.subscribe(todos => {
      if (todos.length > 0) {
        list.innerHTML = '';
        todos.map(todo => {
          const item = new TodoItem(todo).el;
          list.append(item);
        });
      }
    });

    const header = new TodoHeader().el;
    const inputBox = new TodoInput({
      addHandler: todo => {
        todoManager.setTodoItem(todo);
      }
    }).el;

    this.el.append(header, inputBox, list);
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

// ToDo Item
class TodoItem extends Component {
  constructor(item) {
    super({
      tagName: 'li',
      props: { item }
    });
  }
  render() {
    const { item } = this.props;
    this.el.innerHTML = `
      <input type='checkbox' class='checkbox' />
      <p class='content'>${item.content}</p>
      <div class='delete'>delete</div>
    `;
  }
}

// 삭제버튼
// 완료 체크 버튼
