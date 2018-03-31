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
        this.setState({ showModal: true });
    };
    onCloseModal = () => {
        this.setState({ showModal: false });
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
        const { showModal, submitted, teamname } = this.state; 
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={showModal} onClose={this.onCloseModal} little>
                    <div className="modal">
                        <div className="modal__header">
                            <div className="modal__title">Add New Team</div>
                            <div className="modal__space"></div>
                        </div>
                        
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !teamname ? ' has-error' : '')}>
                                    <label htmlFor="teamname">Username</label>
                                    <input type="text" className="form-control" name="teamname" value={teamname} onChange={this.handleChange} />
                                    {submitted && !teamname &&
                                        <div className="help-block">Team Name is required</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group modal__footer">
                                <button className="button button--default">Create</button>
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