import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from '../_components';

import { userActions } from '../_actions';

class ForgotPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
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
        const { email } = this.state;
        const { dispatch } = this.props;
        if (email) {
            dispatch(userActions.forgot(email));
        }
    }

    render() {
        const { forgot } = this.props;
        const { email, submitted } = this.state;
        return (
            <div>
                <Nav />
                <div className="container__small">
                    <h2>Forgot</h2>
                    { forgot && forgot.requesting &&
                        <div className="info info__block">Preparing password reset email...</div>
                    }
                    { forgot && forgot.message &&
                        <div className="help help__block">{ forgot.message }</div>
                    }
                    { forgot && forgot.error &&
                        <div className="error error__block">{ forgot.error }</div>
                    }
                    <form name="form" className="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        { !email &&
                            <Link className="form__link" to="/login">
                                <span>Reached here by mistake - go back to login.</span>
                            </Link>
                        }
                        <div className="form-group form__footer">
                            <button className="button button--default">Forgot</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { forgot } = state.authentication;
    return {
        forgot
    };
}

const connectedForgotPage = connect(mapStateToProps)(ForgotPage);
export { connectedForgotPage as ForgotPage }; 