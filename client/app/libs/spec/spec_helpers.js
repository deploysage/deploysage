const React = require('react');
const ReactDOM = require('react-dom');
const {
  scryRenderedDOMComponentsWithTag,
  findRenderedComponentWithType,
  findAllInRenderedTree
} = require('react-addons-test-utils');
const { Provider } = require('react-redux')

let testNodes_ = [];
let componentFakes;

var Helpers = {
  renderForTest: function(element, node) {
    if (!node) {
      node = document.createElement('div');
      document.body.appendChild(node);
    }
    testNodes_.push(node);
    let component = ReactDOM.render(element, node);
    return component;
  },

  //mockReactComponent: function(componentClass) {
  //  var fakeComponentClass;
  //  for (var i = 0; i < componentFakes.length; i++) {
  //    var registration = componentFakes[i];
  //    if (componentClass === registration.componentClass) {
  //      fakeComponentClass = registration.replacementClass;
  //    }
  //  }
  //
  //  if (!fakeComponentClass) {
  //    fakeComponentClass = createMockReactClass();
  //    componentFakes.push({componentClass: componentClass, replacementClass: fakeComponentClass});
  //  }
  //
  //  return fakeComponentClass;
  //},
  //
  //unmockReactComponent: function(componentClass) {
  //  componentFakes = componentFakes.filter(function(fake) {
  //    return fake.componentClass !== componentClass;
  //  });
  //},

  //createTestStore: function() {
  //  let rootReducer = require('../../reducers');
  //  let { createStore } = require('../../stores');
  //  return createStore(rootReducer);
  //},

  //listenToQueries: function(store) {
  //  let queries = [];
  //  let actions = require('../../actions/actions');
  //
  //  spyOn(store, 'dispatch').and.callFake(function(action) {
  //    if (typeof action === 'string') {
  //      queries.push(action);
  //    }
  //  });
  //
  //  spyOn(actions, 'getQuery').and.callFake(function(queryKey) {
  //    return queryKey;
  //  });
  //
  //  return queries;
  //},
  //
  //renderWithStore: function(component, store) {
  //  return Helpers.renderForTest(
  //    <Provider store={store}>{component}</Provider>
  //  )
  //},
};

module.exports = Helpers;

afterEach(function() {
  testNodes_.forEach(function(node) {
    ReactDOM.unmountComponentAtNode(node);
  });
  testNodes_ = [];
});

beforeEach(function() {
  var oldCreateElement = React.createElement;
  componentFakes = [];
  //spyOn(React, 'createElement').and.callFake(function() {
  //  var args = Array.prototype.slice.call(arguments);
  //  for (var i = 0; i < componentFakes.length; i++) {
  //    var registration = componentFakes[i];
  //    var realComponentClass = args[0];
  //  }
  //  return oldCreateElement.apply(React, args);
  //});
});

function createMockReactClass() {
  return React.createClass({
    render: function() {
      return <div />;
    }
  });
}

