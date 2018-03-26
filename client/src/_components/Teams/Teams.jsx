import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { teamActions } from '../../_actions';

class Teams extends React.Component {
    componentDidMount() {
        this.props.dispatch(teamActions.getAll());
    }

    render() {
        const { teams } = this.props;
        return (
            <div className="inner">
                <h3>Teams</h3>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { teams } = state;
    return {
        teams
    };
}

const connectedTeams = connect(mapStateToProps)(Teams);
export { connectedTeams as Teams };