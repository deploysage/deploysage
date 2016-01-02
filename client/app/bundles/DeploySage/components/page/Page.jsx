import React from 'react';
import RepoWidget from './../repo/RepoWidget';

import css from './Page.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class Page extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={css.page}>
        <div className={css.headerRow}>
          Deploy Sage [LOGIN/LOGOUT PLACEHOLDER]
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
