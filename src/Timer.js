import Component from './core/Component';

export default class Timer extends Component {
  render() {
    const timer = new TimerCircle().el;
    this.el.classList.add('timer');
    this.el.append(timer);
  }
}

class TimerCircle extends Component {
  render() {
    const timeLines = new TimeLines().el;
    const coverCircle = new CoverCircle().el;
    this.el.classList.add('circle');
    this.el.append(timeLines, coverCircle);
  }
}

class CoverCircle extends Component {
  render() {
    const timerFins = new TimerFins().el;
    this.el.classList.add('cover-circle');
    this.el.append(timerFins);
  }
}

class TimeLines extends Component {
  render() {
    this.el.classList.add('lines');

    for (let i = 0; i < 12; i++) {
      const line = document.createElement('div');
      line.classList.add('line');

      // 5분 30도
      line.style.transform = `rotate(${i * 30}deg)`;

      this.el.append(line);
    }
  }
}

class TimerFins extends Component {
  render() {
    this.el.classList.add('fins');

    // 50분 3000개 핀을 만들어 준다.
    for (let i = 1; i <= 3000; i++) {
      const fin = document.createElement('div');
      fin.classList.add('fin');
      // 1초 0.1도
      fin.style.transform = `rotate(${-i * 0.1}deg)`;
      this.el.append(fin);
    }
  }
}
