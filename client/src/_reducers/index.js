import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { teams } from './teams.reducer';
import { sections } from './sections.reducer';
import { links } from './links.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  teams,
  sections,
  links,
  alert
});

export default rootReducer;