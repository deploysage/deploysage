import React, { PropTypes } from 'react';

import css from './Login.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class Login extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    origin: PropTypes.string.isRequired,
  };

  static defaultProps = {
    origin: '',
  };

  render() {
    return (
      <span className={css.login}>
        <span>
          <a href={this.props.origin + '/request_token'}>
            <div className={css.signInWithTwitterGray} />
          </a>
        </span>
      </span>
    );
  }
}
