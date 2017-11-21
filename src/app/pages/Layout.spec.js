/* eslint "react/no-find-dom-node": "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import {Layout} from './Layout';

describe('Layout', () => {
  it('there should be a layout wrapper', () => {
    const wrapper = TestUtils.renderIntoDocument(<Layout/>);
    const wrapperNode = ReactDOM.findDOMNode(wrapper);
    expect(wrapperNode.tagName).toEqual('DIV');
  });
});
