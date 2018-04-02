import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { userActions, teamActions } from '../_actions';
import { Teams, Sections } from '../_components';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user, teams, match } = this.props;
        return (
            <div className="container">
                <div className="sidebar">
                    <div className="sidebar__header">
                        <div className="sidebar__header--title">QuickMark</div>
                    </div>
                    <Teams/>
                </div>
                <div className="main">
                    <div className="header">
                        <h1>Hi {user.name}!</h1>
                        <p>You're logged in {user.account.name}!!</p>
                        <p>
                            <Link to="/login">Logout</Link>
                        </p>
                    </div>
                    <div className="content">
                        <Route path={`${match.url}/:slug`}
                            component={Sections}
                        />
                        <Route exact path={match.url}
                            render={() => (
                            <div>Please select a team.</div>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };