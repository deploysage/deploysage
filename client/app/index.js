'use strict';

// if window is undefined (i.e. during server-side rendering) then do nothing.
if (typeof window !== 'undefined') {
  // TODO: DRY up jwt handling with Auth component
  const jwt = sessionStorage.getItem('jwt');

  // Can't set up ActionCable until the JSON Web Token is available in SessionStorage for auth
  // TODO: get jwt working under Elm
  // if (!!jwt && jwt !== 'null' && jwt !== 'undefined') {
    const Elm = require('./bundles/DeploySageElm/App.elm');
    const mountNode = document.getElementById('main');
    const app = Elm.DeploySageElm.App.embed(mountNode);
    const cableUrl = appSettings.websocketProtocol // eslint-disable-line no-undef
      + '//' + appSettings.origin + '/cable'; // eslint-disable-line no-undef
    const actionCable = ActionCable.createConsumer(cableUrl); // eslint-disable-line no-undef
    const channel = actionCable.subscriptions.create('StateChannel', {
      connected() {
      },

      disconnected() {
      },

      received(changeOperationsDocument) {
        console.log('<--- StateChannel received changeOperationsDocument: ' + changeOperationsDocument);
        app.ports.receiveChangeOperationsDocument.send(changeOperationsDocument);
      },

      updateFromClient(updates) {
        console.log('---> StateChannel performing updateFromClient with updates: ' + updates);
        return this.perform('update_from_client', {
          updates,
        });
      },
    });

    // TODO: is there a more elegant approach than this bind?
    app.ports.updateFromClient.subscribe(channel.updateFromClient.bind(channel));
  // }
}
