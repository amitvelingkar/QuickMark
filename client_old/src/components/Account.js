import React from 'react';
import withAuthorization from './withAuthorization';

const Account = () =>
  <div>
    <h1>Account</h1>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Account);