import React from 'react';
import RepoWidget from '../components/RepoWidget';

import BaseComponent from 'libs/components/BaseComponent';

export default class Page extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <RepoWidget {...this.props} />
    );
  }
}
