export default (actions, origin) => {
  // if window is undefined (i.e. during server-side rendering) then do nothing.
  // TODO: Contribute patch to add .onClient() to react_on_rails:
  //       https://www.pivotaltracker.com/story/show/114177401
  //       Also search for other usages of window !== undefined in components and
  //       remove them too.
  if (typeof window !== 'undefined') {
    // TODO: DRY up jwt handling with Auth component
    const jwt = sessionStorage.getItem('jwt');

    // Can't set up ActionCable until the JSON Web Token is available in SessionStorage for auth
    if (!!jwt && jwt !== 'null' && jwt !== 'undefined') {
      const cableUrl = `ws://${origin}/cable?jwt=` + jwt;
      const cable = ActionCable.createConsumer(cableUrl); // eslint-disable-line no-undef
      window.Cable = {};
      Cable.channel = cable.subscriptions.create('StateChannel', { // eslint-disable-line no-undef
        connected() {
        },

        disconnected() {
        },

        received(changeOperationsDocument) {
          return actions.applyChangeOperations(changeOperationsDocument);
        },

        updateFromClient(updates) {
          return this.perform('update_from_client', {
            updates,
          });
        },
      });
    }
  }
};
