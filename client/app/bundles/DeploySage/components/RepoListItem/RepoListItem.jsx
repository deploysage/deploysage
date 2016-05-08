import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import css from './RepoListItem.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class RepoListItem extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    repoId: PropTypes.string.isRequired,
  };

  render() {
    const $$repo = this.props.$$deploySageStore.getIn(['entities', 'repos', this.props.repoId]);

    return (
      <div className={css.repoListItem}>
        <div className={css.delete}/>
        <div className={css.update}/>
        <div className={`${css.url} spec-RepoListItem-url`}>
          {$$repo.getIn(['url'])}
        </div>
      </div>
    );
  }
}
