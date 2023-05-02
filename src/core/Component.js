export default class Component {
  // payload = 받을 데이터
  constructor(payload = {}) {
    // 객체구조분해 할당을 통해 필요한 데이터를 꺼내 옴
    const { tagName = 'div', props = {} } = payload;
    this.props = props;
    this.el = document.createElement(tagName);
    this.render();
  }

  render() {}
}
