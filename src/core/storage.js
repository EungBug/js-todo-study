const _STORAGEKEY = 'ToDoList';

export function saveTodoItem(item) {
  // item = {content: '', checked: false }
  const savedData = localStorage.getItem(_STORAGEKEY);
  const savedList = JSON.parse(savedData) ?? [];

  savedList.unshift(item);
  localStorage.setItem(_STORAGEKEY, JSON.stringify(savedList));
}

export function getTodoItems() {
  const savedData = localStorage.getItem(_STORAGEKEY);
  const savedList = JSON.parse(savedData) ?? [];
  return savedList;
}

export function getTodoCount() {
  return getTodoItems().length;
}

export function changeTodoTaskDone(id, done) {
  const savedList = getTodoItems();
  const taskIndex = savedList.findIndex(item => {
    return item.id === id;
  });
  savedList[taskIndex].done = done;
  localStorage.setItem(_STORAGEKEY, JSON.stringify(savedList));
}

export function deleteTodoTaskById(id) {
  const savedList = getTodoItems();
  const newList = savedList.filter(item => {
    return item.id !== id;
  });
  localStorage.setItem(_STORAGEKEY, JSON.stringify(newList));
}
