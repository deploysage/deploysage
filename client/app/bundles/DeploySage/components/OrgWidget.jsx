// OrgWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing all your
// dump component names with Widget.

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import _ from 'lodash';

import css from './OrgWidget.scss';
import BaseComponent from 'libs/components/BaseComponent';

// Simple example of a React "dumb" component
export default class OrgWidget extends BaseComponent {
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
    const name = e.target.value;
    this.props.actions.updateName(name);
  }

  render() {
    const $$deploySageStore = this.props.$$deploySageStore;
    const orgId = $$deploySageStore.get('orgs').first();
    const name = $$deploySageStore.getIn(['orgsById', orgId, 'name']);

    return (
      <div className={css.org}>
        <Row>
          <Col xs={12}>
            <PageHeader>
              Example bootstrap header
            </PageHeader>
          </Col>
          <Col xs={6}>
            <p>
              Organization name:
              <input type="text" value={name} onChange={this._handleChange}/>
            </p>
          </Col>
          <Col xs={6}>
            <h3 className="js-org-name">
              Organization is named {name}
            </h3>
          </Col>
        </Row>
      </div>
    );
  }
}
