'use strict';

const Elm = require('./bundles/DeploySageElm/Main.elm');
const mountNode = document.getElementById('main');
const main = Elm.Main.embed(mountNode);
const cableUrl = appSettings.websocketProtocol + '//' + appSettings.origin + '/cable'; // eslint-disable-line no-undef
const actionCable = ActionCable.createConsumer(cableUrl); // eslint-disable-line no-undef
const channel = actionCable.subscriptions.create('StateChannel', {
  connected() {
  },

  disconnected() {
  },

  update(state) {
    // console.log("---> StateChannel performing update with state: " + state);

    return this.perform('update', { state }); // shorthand for "state: state"
  },

  received(state) {
    // console.log("<--- StateChannel received state: " + state);

    main.ports.receiveUpdate.send(state);
  },
});

// TODO: is there a more elegant approach than this bind?
main.ports.publishUpdate.subscribe(channel.update.bind(channel));
