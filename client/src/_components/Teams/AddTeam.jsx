import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { teamActions } from '../../_actions';

class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            submitted: false,
            teamname: ''
        };
    }

    onOpenModal = () => {
        const { dispatch } = this.props;
        this.state.teamname = '';
        this.state.submitted= false,
        dispatch(teamActions.showAddModal());
    };
    onCloseModal = () => {
        const { dispatch } = this.props;
        dispatch(teamActions.closeAddModal());
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        this.setState({ submitted: true });
        const { teamname } = this.state;
        const { dispatch } = this.props;
        if (teamname) {
            dispatch(teamActions.addTeam(teamname));
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { teams } = this.props; 
        const { submitted, teamname } = this.state; 
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={teams.showAddModal || false } onClose={this.onCloseModal} little>
                    <div className="modal">
                        <div className="modal__header">
                            <div className="modal__title">Add New Team</div>
                            <div className="modal__space"></div>
                        </div>
                        
                        <form name="form" onSubmit={this.handleSubmit}>
                            {teams.addError && <span className="text-danger">ERROR: {teams.addError}</span>}
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !teamname ? ' has-error' : '')}>
                                    <label htmlFor="teamname">Username</label>
                                    <input type="text" className="form-control" name="teamname" value={teamname} onChange={this.handleChange} />
                                    {submitted && !teamname &&
                                        <div className="text-danger">Team Name is required</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group modal__footer">
                                {!teams.adding &&
                                    <button className="button button--default">Create</button>    
                                }
                                {teams.adding &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
                    </div>
                </Modal>
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

const connectedTeams = connect(mapStateToProps)(AddTeam);
export { connectedTeams as AddTeam };