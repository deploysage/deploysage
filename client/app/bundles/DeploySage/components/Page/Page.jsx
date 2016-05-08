import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import RepoList from './../RepoList/RepoList';
import RepoWidget from './../RepoWidget/RepoWidget';
import _ from 'lodash';

import css from './Page.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class Page extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, '_handleLogout');
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,

    // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
    // This allows us to immediately know we don't call $$deploySageStore['someProperty'], but instead use
    // the Immutable.js `get` API for Immutable.Map
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  _handleLogout() {
    sessionStorage.removeItem('jwt');
    window.location = '/';
  }

  render() {
    const orgName = this.props.$$deploySageStore.getIn(['entities', 'orgs', '1', 'name']);

    return (
      <div className={css.page}>
        <div className={`${css.headerRow} header-row`}>
          <span>Deploy Sage</span>
          &nbsp;
          <a href="#" onClick={this._handleLogout}>Log Out</a>
          &nbsp;
          <span className="org-name">
            Organization: {orgName}
          </span>

        </div>
        <div className={css.contextRow}>
          <RepoWidget {...this.props} />
        </div>
        <div className={css.columnsRow}>
          <div className={css.column}>
            <div className={css.columnHeader}>
              Deploys
            </div>
          </div>
          <div className={css.middleColumn}>
            <div className={css.columnHeader}>
              Repos and Commits
            </div>
            <div>
              <RepoList {...this.props} />
            </div>
          </div>
          <div className={css.column}>
            <div className={css.columnHeader}>
              Externally Linked Items
            </div>
          </div>
        </div>
      </div>
    );
  }
}
