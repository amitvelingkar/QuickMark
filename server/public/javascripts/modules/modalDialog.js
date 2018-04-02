import { $ } from './bling';

function modalClose(e) {
  const closeButton = $('.modal__close');
  const lightBox = $('.modal__inner');
  const cancelButton = $('.button--cancel');
  e.preventDefault();
  if (event.target == closeButton || event.target == lightBox || event.target == cancelButton) {
    $('.modal').style.display = 'none';
  }
}

export default modalClose;
