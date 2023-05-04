import Component from './core/Component';

export default class Timer extends Component {
  render() {
    this.el.classList.add('timer');
    const baseCircle = document.createElement('div');
    baseCircle.classList.add('circle');
    const lines = document.createElement('div');
    lines.classList.add('lines');

    for (let i = 0; i < 12; i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      line.style.transform = `rotate(${i * 30}deg)`;

      lines.append(line);
    }
    baseCircle.append(lines);

    const coverCircle = document.createElement('div');
    coverCircle.classList.add('cover-circle');
    baseCircle.append(coverCircle);

    const fins = document.createElement('div');
    fins.classList.add('fins');

    for (let i = 1; i <= 3000; i++) {
      const fin = document.createElement('div');
      fin.classList.add('fin');
      fin.style.transform = `rotate(${-i * 0.1}deg)`;
      fins.append(fin);
    }

    coverCircle.append(fins);

    this.el.append(baseCircle);
  }
}
