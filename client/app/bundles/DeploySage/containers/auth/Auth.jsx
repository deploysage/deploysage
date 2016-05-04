import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Reqwest from 'reqwest';
import Uri from 'jsuri';
import actionCableSetup from 'libs/actioncable/actionCableSetup';

// import Uri from 'jsuri';
import BaseComponent from 'libs/components/BaseComponent';
import _ from 'lodash';

export default class Auth extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, '_childWithProps');
  }

  static propTypes = {
    $$deploySageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  componentWillMount() {
    let locationDefined = false;

    try {
      /* eslint-disable no-unused-expressions */
      location; // this will throw an exception on server rendering
      locationDefined = true;
    } catch (e) {
      // no-op - location reference fails in server rendering, but trying and catching the
      // exception is the only (?) way to check it.
    }

    if (locationDefined) {
      this._copyJwtFromUriToSessionStorage();
    }
  }

  componentDidMount() {
    const jwt = sessionStorage.getItem('jwt');
    if (!!jwt && jwt !== 'null' && jwt !== 'undefined') {
      const origin = this.props.$$deploySageStore.getIn(['clientState', 'origin']);
      this._loadCurrentUserFromApi(origin);
      actionCableSetup(this.props.actions, origin);
    }
  }

  _copyJwtFromUriToSessionStorage() {
    const jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt && jwt !== 'null' && jwt !== 'undefined') {
      sessionStorage.setItem('jwt', jwt);
    }
  }

  _loadCurrentUserFromApi(origin) {
    this._readFromApi(`http://${origin}/current_user`, this._authenticated.bind(this));
  }

  _authenticated(user) {
    this.props.actions.authenticated(user);
  }

  _readFromApi(url, successFunction) {
    /* eslint-disable func-names, new-cap */
    Reqwest({
      contentType: 'application/json',
      error: (error) => {
        /* eslint-disable no-console */
        console.error(url, error.response);
        window.location = '/';
      },

      headers: { Authorization: sessionStorage.getItem('jwt') },
      method: 'get',
      success: successFunction,
      type: 'json',
      url,
    });
  }

  _childWithProps(child) {
    // TODO: DRY up
    const origin = this.props.$$deploySageStore.getIn(['clientState', 'origin']);
    return React.cloneElement(
      child,
      { origin }
    );
  }

  render() {
    // example of passing additional props to a child without hardcoding type of child
    // See https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html
    // and http://stackoverflow.com/a/32371612/25192
    // In this case there is only a single child, so this.props.children is an object
    // instead of an array, but we can still use React.Children.map
    const childrenWithProps = React.Children.map(this.props.children, this._childWithProps);

    return (
      <span>{childrenWithProps}</span>
    );
  }
}
