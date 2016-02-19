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
    return (
      <div className={css.page}>
        <div className={`${css.headerRow} header-row`}>
          <span>Deploy Sage</span>
          <a href="#" onClick={this._handleLogout}>Log Out</a>
        </div>
        <div className={css.contextRow}>
          <RepoWidget {...this.props} />
        </div>
        <div className={css.columnsRow}>
          <div className={css.column}>
            left column
          </div>
          <div className={css.middleColumn}>
            middle column
          </div>
          <div className={css.column}>
            right column
          </div>
        </div>
      </div>
    );
  }
}
