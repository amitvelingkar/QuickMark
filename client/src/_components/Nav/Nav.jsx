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
        return (
            <div className="top">
                <div className="nav">
                    <div className="nav__section">
                        { user && user.account &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/team">
                                    <div className="nav__title">{user.account.name}</div>
                                </Link>
                            </li>
                        }
                        { !user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/">
                                    <div className="nav__title">QuickMark</div>
                                </Link>
                            </li>
                        }
                        
                    </div>
                    <div className="nav__section">
                        { user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/admin">
                                    <IconAdmin/><span>Admin</span>
                                </Link>
                            </li>
                        }
                        { user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/users">
                                    <IconUsers/><span>Users</span>
                                </Link>
                            </li>
                        }
                        { user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/login">
                                    <IconLogout/><span>Logout</span>
                                </Link>
                            </li>
                        }
                        { user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/profile">
                                    <IconProfile/><span>Profile</span>
                                </Link>
                            </li>
                        }
                        { !user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/login">
                                    <IconProfile/><span>Login</span>
                                </Link>
                            </li>
                        }
                        { !user &&
                            <li className="nav__item">
                                <Link className="nav__link" to="/register">
                                    <IconProfile/><span>Register</span>
                                </Link>
                            </li>
                        }
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