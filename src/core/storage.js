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