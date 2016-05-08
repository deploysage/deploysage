import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ColumnHeader from './../ColumnHeader/ColumnHeader';
import RepoListItem from './../RepoListItem/RepoListItem';

import css from './RepoList.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class RepoList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  render() {
    const $$repoIds = this.props.$$deploySageStore.getIn(['result', 'repos']);

    return (
      <div className={css.repoList}>
        <ColumnHeader {...this.props} headerText="Repos and Commits"/>
        <div>
          {$$repoIds.map((repoId) =>
            <div key={`row-${repoId}`} className={css.row}>
              <RepoListItem {...this.props} repoId={repoId} key={`RepoListItem-${repoId}`}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}
