import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { userActions } from '../../_actions';
import Icon from '../../resources/images/add_circle.svg';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            submitted: false,
            username: ''
        };
    }

    onOpenModal = () => {
        const { dispatch } = this.props;
        this.state.username = '';
        this.state.submitted= false,
        dispatch(userActions.showAddModal());
    };
    onCloseModal = () => {
        const { dispatch } = this.props;
        dispatch(userActions.closeAddModal());
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username } = this.state;
        const { dispatch, teamslug } = this.props;
        if (username) {
            dispatch(userActions.addUser(teamslug, username));
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { users } = this.props; 
        const { submitted, username } = this.state; 
        return (
            <div>
                <div className="button button--default" onClick={this.onOpenModal}>Invite User</div>
                <Modal open={users.showAddModal || false } onClose={this.onCloseModal} little>
                    <div className="modal">
                        <div className="modal__header">
                            <div className="modal__title">Add New User</div>
                            <div className="modal__space"></div>
                        </div>
                        
                        <form name="form" onSubmit={this.handleSubmit}>
                            {users.addError && <span className="text-danger">ERROR: {users.addError}</span>}
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} autoFocus/>
                                    {submitted && !username &&
                                        <div className="text-danger">User Name is required</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group modal__footer">
                                {!users.adding &&
                                    <button className="button button--default">Create</button>    
                                }
                                {users.adding &&
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
    const { users } = state;
    return {
        users
    };
}

const connectedUsers = connect(mapStateToProps)(AddUser);
export { connectedUsers as AddUser };