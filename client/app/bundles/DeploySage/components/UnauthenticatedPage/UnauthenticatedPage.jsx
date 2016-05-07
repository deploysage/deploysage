import React from 'react';
import Auth from './../../containers/Auth/Auth';
import Login from './../Login/Login';

import css from './UnauthenticatedPage.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class UnauthenticatedPage extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={css.unauthenticatedPage}>
        <div>
          <span>
            <Auth {...this.props}>
              <Login />
            </Auth>
          </span>
        </div>
      </div>
    );
  }
}
