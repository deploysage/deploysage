import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import css from './ColumnHeader.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class ColumnHeader extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    headerText: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={css.columnHeader}>
        <div className={`${css.headerText} spec-ColumnHeader-headerText`}>
          {this.props.headerText}
        </div>
        <div className={css.controls}/>
      </div>
    );
  }
}
