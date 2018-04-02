import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconDelete from '../../resources/images/delete.svg';

import { sectionActions } from '../../_actions';
import { AddSection } from './AddSection';
import { AddLink } from '../Links/AddLink';

class Sections extends React.Component {
    componentDidMount() {
        const { params } = this.props.match;
        this.props.dispatch(sectionActions.getAll(params.slug));
    }
    deleteSection = (id) => {
        this.props.dispatch(sectionActions.deleteSection(id));
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
                        <AddSection teamslug={match.params.slug}/>
                    </div>
                </div>
                {sections.loading && <em>Loading sections...</em>}
                {sections.error && <span className="text-danger">ERROR: {sections.error}</span>}
                {sections.items &&
                    <div>
                        {sections.items.map((section, index) =>
                            <div className='section' key={section._id}>
                                <div className="section__header">
                                    <div className='list__title'> {section.name} </div>
                                    <div className='list__actions'>
                                        <div className="list__action list__action--delete">
                                            <div onClick={ () => {this.deleteSection(section._id)}}>
                                                <IconDelete />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {section.links &&
                                    <div className="links">
                                        {section.links.map((link, index) =>
                                            <div className="link">
                                            <div key={link._id} className="link__title">
                                                <a href={link.url} className="list__link">{link.name || link.url}</a>
                                            </div>
                                            </div>
                                        )}
                                    </div>
                                }
                                <AddLink sectionId={section._id} />
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