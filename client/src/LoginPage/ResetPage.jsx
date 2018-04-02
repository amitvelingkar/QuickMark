import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from '../_components';

import { userActions } from '../_actions';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            password: '',
            passwordConfim: '',
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
        const { username, password, passwordConfirm } = this.state;
        const { dispatch, match } = this.props;
        const { token } = match.params;
        if (password && passwordConfirm) {
            dispatch(userActions.reset(password, token));
        }
    }

    render() {
        const { reset } = this.props;
        const { password, passwordConfirm, submitted } = this.state;
        return (
            <div>
                <Nav />
                <div className="container__small">
                    <h2>Forgot</h2>
                    { reset && reset.requesting &&
                        <div className="info info__block">Preparing password reset email...</div>
                    }
                    { reset && reset.message &&
                        <div className="help help__block">{ reset.message }</div>
                    }
                    { reset && reset.error &&
                        <div className="error error__block">{ reset.error }</div>
                    }
                    <form name="form" className="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} autoFocus     />
                            {submitted && !password &&
                                <div className="error__text error">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !passwordConfirm ? ' has-error' : '')}>
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} />
                            {submitted && !passwordConfirm &&
                                <div className="error__text error">Password is required</div>
                            }
                            {submitted && passwordConfirm !== password &&
                                <div className="error__text error">Both passwords must match</div>
                            }
                        </div>
                        <div className="form-group form__footer">
                            <button className="button button--default">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { reset } = state.authentication;
    return {
        reset
    };
}

const connectedResetPage = connect(mapStateToProps)(ResetPage);
export { connectedResetPage as ResetPage }; 