import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Page from '../../components/Page/Page';
import UnauthenticatedPage from '../../components/UnauthenticatedPage/UnauthenticatedPage';

// import Uri from 'jsuri';
import BaseComponent from 'libs/components/BaseComponent';

export default class UiStateMachine extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  render() {
    const uiState = this.props.$$deploySageStore.getIn(['clientState', 'uiState']);
    if (uiState === 'unauthenticated') {
      return (<UnauthenticatedPage {...this.props} />);
    } else if (uiState === 'authenticated') {
      return (<Page {...this.props} />);
    }

    return (<div className="error">Invalid uiState: '{uiState}'</div>);
  }
}
