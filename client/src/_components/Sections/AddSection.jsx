import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { sectionActions } from '../../_actions';
import Icon from '../../resources/images/add_circle.svg';

class AddSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            submitted: false,
            sectionname: ''
        };
    }

    onOpenModal = () => {
        const { dispatch } = this.props;
        this.state.sectionname = '';
        this.state.submitted= false,
        dispatch(sectionActions.showAddModal());
    };
    onCloseModal = () => {
        const { dispatch } = this.props;
        dispatch(sectionActions.closeAddModal());
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { sectionname } = this.state;
        const { dispatch, teamslug } = this.props;
        if (sectionname) {
            dispatch(sectionActions.addSection(teamslug, sectionname));
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { sections } = this.props; 
        const { submitted, sectionname } = this.state; 
        return (
            <div>
                <div className="button button--default" onClick={this.onOpenModal}>Create Section</div>
                <Modal open={sections.showAddModal || false } onClose={this.onCloseModal} little>
                    <div className="modal">
                        <div className="modal__header">
                            <div className="modal__title">Add New Section</div>
                            <div className="modal__space"></div>
                        </div>
                        
                        <form name="form" onSubmit={this.handleSubmit}>
                            {sections.addError && <span className="text-danger">ERROR: {sections.addError}</span>}
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !sectionname ? ' has-error' : '')}>
                                    <label htmlFor="sectionname">Username</label>
                                    <input type="text" className="form-control" name="sectionname" value={sectionname} onChange={this.handleChange} autoFocus/>
                                    {submitted && !sectionname &&
                                        <div className="text-danger">Section Name is required</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group modal__footer">
                                {!sections.adding &&
                                    <button className="button button--default">Create</button>    
                                }
                                {sections.adding &&
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
    const { sections } = state;
    return {
        sections
    };
}

const connectedSections = connect(mapStateToProps)(AddSection);
export { connectedSections as AddSection };