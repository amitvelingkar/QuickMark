import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import { linkActions } from '../../_actions';
import Icon from '../../resources/images/add_circle.svg';

class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            submitted: false,
            linkname: '',
            linkurl: '',
        };
    }

    onOpenModal = () => {
        const { dispatch } = this.props;
        this.state.linkname = '';
        this.state.linkurl = '';
        this.state.submitted= false,
        dispatch(linkActions.showAddModal());
    };
    onCloseModal = () => {
        const { dispatch } = this.props;
        dispatch(linkActions.closeAddModal());
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { linkname, linkurl } = this.state;
        const { dispatch, sectionId } = this.props;
        if (linkname && linkurl) {
            dispatch(linkActions.addLink(sectionId, linkurl, linkname));
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { links } = this.props; 
        const { submitted, linkname, linkurl } = this.state; 
        return (
            <div>
                <div className="link__add" onClick={this.onOpenModal}>+ create link</div>
                <Modal open={links.showAddModal || false } onClose={this.onCloseModal} little>
                    <div className="modal">
                        <div className="modal__header">
                            <div className="modal__title">Add New Link</div>
                            <div className="modal__space"></div>
                        </div>
                        
                        <form name="form" onSubmit={this.handleSubmit}>
                            {links.addError && <span className="text-danger">ERROR: {links.addError}</span>}
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !linkurl ? ' has-error' : '')}>
                                    <label htmlFor="linkurl">URL</label>
                                    <input type="url" className="form-control" name="linkurl" value={linkurl} onChange={this.handleChange} autoFocus/>
                                    {submitted && !linkurl &&
                                        <div className="text-danger">URL is required</div>
                                    }
                                </div>
                            </div>
                            <div className="modal__content">
                                <div className={'form-group' + (submitted && !linkname ? ' has-error' : '')}>
                                    <label htmlFor="linkname">Short Description (Name)</label>
                                    <input type="text" className="form-control" name="linkname" value={linkname} onChange={this.handleChange}/>
                                    {submitted && !linkname &&
                                        <div className="text-danger">Short Description is required</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group modal__footer">
                                {!links.adding &&
                                    <button className="button button--default">Create</button>    
                                }
                                {links.adding &&
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
    const { links } = state;
    return {
        links
    };
}

const connectedLinks = connect(mapStateToProps)(AddLink);
export { connectedLinks as AddLink };