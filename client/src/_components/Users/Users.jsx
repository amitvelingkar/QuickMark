import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconDelete from '../../resources/images/delete.svg';

import { userActions, linkActions } from '../../_actions';
import { InviteUser } from './InviteUser';
import { AddLink } from '../Links/AddLink';
import { roleToText } from '../../_helpers/auth-header';

class Users extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }
    deleteUser = (id) => {
        // this.props.dispatch(userActions.deleteUser(id));
    }
    deleteInvitation = (id) => {
        // this.props.dispatch(userActions.deleteUser(id));
    }
    render() {
        const { users } = this.props;
        return (
            <div className='inner'>
                <div className="pageheader">
                    <div className="title">
                        Users
                    </div>
                    <div className="actions">
                        <InviteUser/>
                    </div>
                </div>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items && users.items.users &&
                    <div>
                        {users.items.users.map((user, index) =>
                            <div className='card' key={user._id}>
                                <div className="card__content">
                                    <div className='card__title'> {user.name} </div>
                                    <div className="card__subtitle">{roleToText(user.role)}</div>
                                </div>
                                <div className='card__actions'>
                                    <div className="card__action card__action--delete">
                                        <div onClick={ () => {this.deleteUser(user._id)}}>
                                            <IconDelete />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {users.items && users.items.invitations &&
                    <div>
                        <h2>Pending Invitations</h2>
                        {users.items.invitations.map((invitation, index) =>
                            <div className='card' key={invitation._id}>
                                <div className="card__content">
                                    <div className='card__title'> {invitation.email} </div>
                                    <div className="card__subtitle">{roleToText(invitation.role)}</div>
                                </div>
                                <div className='card__actions'>
                                    <div className="card__action card__action--delete">
                                        <div onClick={ () => {this.deleteInvitation(invitation._id)}}>
                                            <IconDelete />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
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

const connectedUsers = connect(mapStateToProps)(Users);
export { connectedUsers as Users };