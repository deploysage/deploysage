import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import RepoWidget from './../repo/RepoWidget';
import _ from 'lodash';

import css from './Page.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class Page extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, '_handleLogout');
  }

  static propTypes = {
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
          <span className="js-org-name">
            Organization: {orgName}
          </span>

        </div>
        <div className={css.contextRow}>
          <RepoWidget {...this.props} />
        </div>
        <div className={css.columnsRow}>
          <div className={css.column}>
            Deploys
          </div>
          <div className={css.middleColumn}>
            Repos and Commits
          </div>
          <div className={css.column}>
            Externally Linked Items
          </div>
        </div>
      </div>
    );
  }
}
