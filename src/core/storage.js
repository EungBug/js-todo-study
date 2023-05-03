/**
 * 로컬 스토리지에 CRUD하는 함수들을 모듈화 한 스크립트 파일
 */
const _STORAGEKEY = 'ToDoList';

export function saveTodoItem(item) {
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
