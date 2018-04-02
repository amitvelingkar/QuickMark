import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';
import ajaxHeart from './modules/heart';
import modalClose from './modules/modalDialog';
import showTeamForm from './modules/team';

autocomplete( $('#address'), $('#lat'), $('#lng') );

typeAhead( $('.search') );

makeMap( $('#map') );

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

const modalDialog = $$('.modal__close, .modal__inner, .button--cancel');
modalDialog.on('click', modalClose);

const addTeam = $$('.sidebar__addTeam');
addTeam.on('click', showTeamForm);
