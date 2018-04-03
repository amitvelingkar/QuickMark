import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// import { userActions, teamActions } from '../_actions';
import { Users, Nav } from '../_components';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user, teams, match } = this.props;
        return (
            <div className="container">
                <div className="main">
                    <div className="header">
                        <Nav />
                    </div>
                    <Users />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    const { user } = state.authentication;
    return {
        users,
        user
    };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };