import './style.css';
import { renderApp } from './app';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found.');
}

renderApp(app, window.location.pathname);
