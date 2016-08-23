import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Input from 'react-bootstrap/lib/Input';
import _ from 'lodash';

import css from './RepoWidget.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class RepoWidget extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, '_handleChange');
  }

  static propTypes = {
    // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
    // This allows us to immediately know we don't call $$deploySageStore['someProperty'], but instead use
    // the Immutable.js `get` API for Immutable.Map
    actions: PropTypes.object.isRequired,
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  // React will automatically provide us with the event `e`
  _handleChange(e) {
    if (typeof window !== 'undefined') {
      Cable.channel.updateFromClient({ url: e.target.value }); // eslint-disable-line no-undef
    }
  }

  render() {
    const $$deploySageStore = this.props.$$deploySageStore;
    const repoId = $$deploySageStore.getIn(['result', 'repos']).first();
    const url = $$deploySageStore.getIn(['entities', 'repos', repoId, 'url']);

    return (
      <div className={css.repo}>
        <Input
          type="text"
          id="repo-url"
          label="Repo URL"
          value={url}
          size="100"
          onChange={this._handleChange}
        />
        Repo URL:
        <div className={`${css.repoDisplay} js-repo-url`}>
          {url}
        </div>
      </div>
    );
  }
}
