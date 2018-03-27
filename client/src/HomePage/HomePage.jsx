import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, teamActions } from '../_actions';
import { Teams } from '../_components';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(teamActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, teams } = this.props;
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
                        One of three columns
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { teams, authentication } = state;
    const { user } = authentication;
    return {
        user,
        teams
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };