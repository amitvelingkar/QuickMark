import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { teamActions } from '../../_actions';

class AddTeam extends React.Component {
    onOpenModal = () => {
        this.props.dispatch(teamActions.showModal());
    };
    onCloseModal = () => {
        this.props.dispatch(teamActions.closeModal());
    };

    render() {
        const { teams } = this.props; 
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={teams.showModal} onClose={this.onCloseModal} little>
                <h2>Simple centered modal</h2>
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