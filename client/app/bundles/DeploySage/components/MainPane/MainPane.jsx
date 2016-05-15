import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import RepoWidget from './../RepoWidget/RepoWidget';

import css from './MainPane.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class MainPane extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  render() {
    const paneComponentMap = {
      RepoForm: RepoWidget,
    };

    const activePane = this.props.$$deploySageStore.getIn(['clientState', 'activePane']);
    const activePaneComponentName = `${activePane.getIn(['model'])}${activePane.getIn(['paneType'])}`;
    const ActivePaneComponent = paneComponentMap[activePaneComponentName];

    return (
      <div className={css.mainPane}>
        <ActivePaneComponent {...this.props}/>
      </div>
    );
  }
}
