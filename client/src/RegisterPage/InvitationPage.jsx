import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from '../_components';

import { userActions } from '../_actions';

class InvitationPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        const { params } = this.props.match;
        this.props.dispatch(userActions.getInvitation(params.token));

        this.state = {
            name: '',
            password: '',
            passwordConfirm: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, password, passwordConfirm } = this.state;
        const { dispatch } = this.props;
        const { params } = this.props.match;
        if (name && password && params.token && password === passwordConfirm) {
            dispatch(userActions.acceptInvitation(name, email, params.token));
        }
    }

    render() {
        const { info, accept } = this.props.invitation;
        const { name, password, passwordConfirm, submitted } = this.state;
        return (
            <div>
                <Nav />
                <div className="container__small">
                    <h2>Welcome to QuickMark</h2>
                    { info && info.loading &&
                        <div className="info info__block">Loading your invitation...</div>
                    }
                    { info && info.error &&
                        <div className="info info__block">{info.error}</div>
                    }
                    { info && info.item &&
                        <div>
                            <div className="info info__block"><strong>{info.item.email}</strong> will be added to the <strong>{info.item.account.name}</strong> organization.</div>
                            <div className="info info__block">All we need is your name and a password.</div>
                            <form name="form" className="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                                    {submitted && !name &&
                                        <div className="help-block">Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !passwordConfirm ? ' has-error' : '')}>
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} />
                                    {submitted && !passwordConfirm &&
                                        <div className="help-block">Password is required</div>
                                    }
                                    {submitted && passwordConfirm !== password &&
                                        <div className="help-block">Both passwords must match</div>
                                    }
                                </div>
                                <div className="form-group form__footer">
                                    <button className="button button--default">Register</button>
                                    {accept && accept.loading &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                            </form>
                        </div>
                    }
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { invitation } = state.authentication;
    return {
        invitation
    };
}

const connectedInvitationPage = connect(mapStateToProps)(InvitationPage);
export { connectedInvitationPage as InvitationPage }; 