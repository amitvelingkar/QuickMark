import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import IconAdmin from '../../resources/images/admin.svg';
import IconUsers from '../../resources/images/people.svg';
import IconLogout from '../../resources/images/logout.svg';
import IconProfile from '../../resources/images/person.svg';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user } = this.props;
        const { account } = user;
        return (
            <div className="top">
                <div className="nav">
                    <div className="nav__section">
                        <li className="nav__item">
                            <Link className="nav__link" to="/team">
                                <div className="nav__title">{account.name}</div>
                            </Link>
                        </li>
                    </div>
                    <div className="nav__section">
                        <li className="nav__item">
                            <Link className="nav__link" to="/admin">
                                <IconAdmin/><span>Admin</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link" to="/users">
                                <IconUsers/><span>Users</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link" to="/login">
                                <IconLogout/><span>Logout</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link" to="/profile">
                                <IconProfile/><span>Profile</span>
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedNav = connect(mapStateToProps)(Nav);
export { connectedNav as Nav };