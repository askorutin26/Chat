// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.js';

const app = async () => {
  const socket = io();
  const vdom = await init(socket);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(vdom);
};
app();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
