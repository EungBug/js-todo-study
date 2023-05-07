import Component from './core/Component';

export default class Timer extends Component {
  render() {
    const header = document.createElement('div');
    header.classList.add('timer-header');
    header.innerHTML = `
      <h2>50분 빡코딩💻 10분 꿀휴식🍯</h2>
      <span class="material-symbols-outlined close">close</span>
    `;
    const closeBtn = header.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      this.el.classList.add('hide');
    });
    const startBtn = document.createElement('div');
    startBtn.classList.add('btn');
    startBtn.textContent = 'START';

    const timer = new TimerCircle().el;
    const timeLines = new TimeLines().el;
    const coverCircle = new CoverCircle().el;
    const timerFins = new TimerFins();
    coverCircle.append(timerFins.el);
    timer.append(timeLines, coverCircle);

    this.el.classList.add('timer', 'hide');
    this.el.append(header, timer, startBtn);

    let interval;
    startBtn.addEventListener('click', () => {
      startBtn.classList.toggle('start');
      if (startBtn.classList.contains('start')) {
        startBtn.textContent = 'STOP';
        timerFins.removeFin();
        interval = setInterval(() => {
          timerFins.removeFin();
        }, 1000);
      } else {
        startBtn.textContent = 'START';
        clearInterval(interval);
      }
    });
  }
}

class TimerCircle extends Component {
  render() {
    this.el.classList.add('circle');
  }
}

class CoverCircle extends Component {
  render() {
    this.el.classList.add('cover-circle');
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

  removeFin() {
    this.el.removeChild(this.el.lastChild);
  }
}
