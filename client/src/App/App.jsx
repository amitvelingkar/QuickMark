import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { UsersPage } from '../UsersPage';
import { LoginPage, ForgotPage, ResetPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import '../_styles/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute path="/team" component={HomePage} />
                        <PrivateRoute path="/users" component={UsersPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/forgot" component={ForgotPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/reset/:token" component={ResetPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 