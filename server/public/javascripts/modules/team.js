import axios from 'axios';
import { $ } from './bling';

function populateForm() {
  $('.modal__title').textContent = 'Create New Team';
  $('.button--ok').textContent = 'Create';
  const html = `
      <label for="name">Name</label>
      <input type="text" name="name">
  `;
  $('.modal__content').innerHTML = html;

  // finally show the form
  $('.modal').style.display = 'block';
}

function showTeamForm(e) {
  populateForm();
}

export default showTeamForm;
