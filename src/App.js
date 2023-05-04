import Component from './core/Component';
import ToDoManager from './todo';

// ToDo class의 인스턴스를 전역으로 생성하여 모든 컴포넌트에서
// 컴포넌트마다 필요한 기능을 호출 할 수 있도록 했음
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
    inputEl.addEventListener('keydown', event => {
      if (inputEl.value.trim() === '') return;
      if (event.key === 'Enter' && !event.isComposing) {
        this.props.addHandler(event.target.value);
        event.target.value = '';
      }
    });

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('btn');
    submitBtn.textContent = 'Do!';
    submitBtn.addEventListener('click', () => {
      if (inputEl.value.trim() === '') return;
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
    this.el.classList.add('todo__list');

    todoList.length !== 0
      ? (this.el.innerHTML = `
          <div class="todo__count">
            Task
            <span>${todoList.length}</span>
          </div>`)
      : (this.el.innerHTML = '');

    todoList?.map(todo => {
      const item = new TodoItem(todo).el;
      this.el.append(item);
    });
  }
}

// ToDo Item
// App 컴포넌트의 하위 컴포넌트로 현재는 모두 한 파일에 컴포넌트들이 있지만
// 각각의 컴포넌트를 모듈화 한다면 ToDo 인스턴스를 어떻게 참조해야할지?
// TodoItem의 매개변수로 받는 방법 이외
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
      <span class="material-symbols-outlined delete">
        delete
      </span>
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

    const btnDelete = this.el.querySelector('.delete');
    btnDelete.addEventListener('click', () => {
      todoManager.deleteTodoItem(item.id);
    });
    // btnDelete.addEventListener('click', todoManager.deleteTodoItem.bind(item.id));
  }
}
