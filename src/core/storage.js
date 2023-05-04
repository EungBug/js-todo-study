// 멘토링 피드백 반영
// 재사용성을 고려하는 코딩이 필요
export default class StorageUtil {
  constructor(key) {
    this.key = key;
  }

  setDataInList(item) {
    const savedData = localStorage.getItem(this.key);
    const savedList = JSON.parse(savedData) ?? [];
    savedList.unshift(item);
    localStorage.setItem(this.key, JSON.stringify(savedList));
  }

  getDataList() {
    const savedData = localStorage.getItem(this.key);
    const savedList = JSON.parse(savedData) ?? [];
    return savedList;
  }

  getListSize() {
    return this.getDataList().length;
  }

  updateDataById(id, name, state) {
    const savedList = this.getDataList();
    const findIndex = savedList.findIndex(data => {
      return data.id === id;
    });

    if (findIndex === -1) return;
    savedList[findIndex][name] = state;
    localStorage.setItem(this.key, JSON.stringify(savedList));
  }

  deleteDataById(id) {
    const prevList = this.getDataList();
    const newList = prevList.filter(item => {
      return item.id !== id;
    });
    localStorage.setItem(this.key, JSON.stringify(newList));
  }
}
