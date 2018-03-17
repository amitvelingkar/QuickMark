import { $ } from './bling';

function modalClose(e) {
  const closeButton = $('.modal__close');
  const lightBox = $('.modal__inner');
  e.preventDefault();
  if (event.target == closeButton || event.target == lightBox) {
    $('.modal').style.display = 'none';
  }
}

export default modalClose;
