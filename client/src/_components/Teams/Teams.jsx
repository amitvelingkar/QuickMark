import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { teamActions } from '../../_actions';
import { AddTeam } from '../../_components';

class Teams extends React.Component {
    componentDidMount() {
        this.props.dispatch(teamActions.getAll());
    }

    render() {
        const { teams } = this.props;
        return (
            <div className='sidebar__section'>
                <div className='sidebar__section--header'>
                    <div className='sidebar__section--title'>
                    Teams
                    </div>
                </div>
                {teams.loading && <em>Loading teams...</em>}
                {teams.error && <span className="text-danger">ERROR: {teams.error}</span>}
                {teams.items &&
                    <div>
                        {teams.items.map((team, index) =>
                            <div className='list'>
                                <div className='list__title'>
                                    <a key={team._id} href={`/team/${team.slug}`}>
                                        {team.name}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                }
                <AddTeam />
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