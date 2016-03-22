import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';
import { shallow as shallowRender, render as staticRender } from 'enzyme';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// everything we need for our tests
export { shallow as shallowRender } from 'enzyme';
export { render as staticRender } from 'enzyme';
const {
  expect,
} = chai;

chai.use(chaiImmutable);
chai.use(chaiEnzyme());

export function wrapperFuncs(Component, defaultProps) {
  return {
    staticWrapper: () => staticRender(<Component {...defaultProps} />),
    shallowWrapper: () => shallowRender(<Component {...defaultProps} />),
  };
}

export {
  React,
  chai,
  expect,
  TestUtils,
};
