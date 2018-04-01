import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sectionActions } from '../../_actions';
// import { AddSection } from '../../_components';

class Sections extends React.Component {
    componentDidMount() {
        const { params } = this.props.match;
        this.props.dispatch(sectionActions.getAll(params.slug));
    }
    deleteSection = (id) => {
        // this.props.dispatch(sectionActions.deleteSection(id));
    }
    render() {
        const { sections, match } = this.props;
        return (
            <div className='inner'>
                <div className="pageheader">
                    <div className="title">
                        <a href="/section/jumamji">{match.params.slug}</a>
                    </div>
                    <div className="actions">
                        <div className="button button--default">Create Section</div>
                    </div>
                </div>
                {sections.loading && <em>Loading sections...</em>}
                {sections.error && <span className="text-danger">ERROR: {sections.error}</span>}
                {sections.items &&
                    <div>
                        {sections.items.map((section, index) =>
                            <div className='list' key={section._id}>
                                <div className='list__title'> {section.name} </div>
                                <div className='list__actions'>
                                    <div className="list__action list__action--delete">
                                        <span onClick={ () => {this.deleteTeam(section._id)}}>delete</span>
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
    const { sections } = state;
    return {
        sections
    };
}

const connectedSections = connect(mapStateToProps)(Sections);
export { connectedSections as Sections };