import App from './App';
import Timer from './Timer';

const app = document.getElementById('app');
const timer = new Timer().el;
app.append(timer);
