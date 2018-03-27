import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { teamActions } from '../../_actions';

class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    onOpenModal = () => {
        this.setState({ showModal: true });
    };
    onCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { showModal } = this.state; 
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={showModal} onClose={this.onCloseModal} little>
                <h2>Simple centered modal</h2>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedTeams = connect(mapStateToProps)(AddTeam);
export { connectedTeams as AddTeam };