import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Input from 'react-bootstrap/lib/Input';
import _ from 'lodash';

import css from './RepoWidget.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class RepoWidget extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, '_handleChange');
  }

  static propTypes = {
    // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
    // This allows us to immediately know we don't call $$deploySageStore['someProperty'], but instead use
    // the Immutable.js `get` API for Immutable.Map
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  // React will automatically provide us with the event `e`
  _handleChange(e) {
    const url = e.target.value;
    this.props.actions.updateUrl(url);
  }

  render() {
    const $$deploySageStore = this.props.$$deploySageStore;
    const repoId = $$deploySageStore.getIn(['result', 'repos']).first();
    const url = $$deploySageStore.getIn(['entities', 'repos', repoId, 'url']);
    const orgName = $$deploySageStore.getIn(['entities', 'orgs', '1', 'name']);

    return (
      <div className={css.repo}>
        <Row>
          <Col xs={12}>
            <PageHeader className="js-org-name">
              Organization: {orgName}
            </PageHeader>
          </Col>
          <Col xs={6}>
            <form className="form-horizontal">
              <Input
                id="repo-url"
                type="text"
                label="Repo URL"
                value={url}
                onChange={this._handleChange}
              />
            </form>
          </Col>
          <Col xs={6}>
            <h3 className="js-repo-url">
              Repo URL: {url}
            </h3>
          </Col>
        </Row>
      </div>
    );
  }
}
