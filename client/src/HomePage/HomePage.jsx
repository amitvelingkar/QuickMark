import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, teamActions } from '../_actions';

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
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in {user.account.name}!!</p>
                <h3>Teams from secure api end point:</h3>
                {teams.loading && <em>Loading teams...</em>}
                {teams.error && <span className="text-danger">ERROR: {teams.error}</span>}
                {teams.items &&
                    <ul>
                        {teams.items.map((team, index) =>
                            <li key={team._id}>
                                {team.name}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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