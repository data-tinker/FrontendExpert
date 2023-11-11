// This file is initialized with a few test cases.
// Feel free to add, edit, or remove test cases in
// this file as you see fit!

/* ---------------------------------- *
 * ----- BROWSER TESTING SET-UP ----- *
 * ---------------------------------- */
import React from "react";
import { fireEvent } from '@testing-library/react';
import TipCalculator from '../TipCalculator';
import { act, Simulate } from 'react-dom/test-utils';

import { JSDOM } from 'jsdom';
import chai from 'chai';
import { createRoot } from "react-dom/client";

const {expect} = chai;

let rootContainer;
let inputs;
let labels;
let paragraphs;

const resetDom = () => {
  const dom = new JSDOM({
    url: 'http://localhost:3000',
    resources: 'usable',
    pretendToBeVisual: true,
  });

  global.document = dom.window.document;
  global.window = dom.window;

  for (const [key, value] of Object.entries(React)) {
    global[key] = value;
  }

  rootContainer = document.createElement('div');
  rootContainer.id = 'root';
  document.body.appendChild(rootContainer);

  act(() => {
    const root = createRoot(rootContainer);
    root.render(<TipCalculator />);
  });

  inputs = document.querySelectorAll('input');
  labels = document.querySelectorAll('label');
  paragraphs = document.querySelectorAll('p');
};

/* ---------------------------------- *
 * ----- BROWSER TESTING SET-UP ----- *
 * ---------------------------------- */

const typeInInput = (input, text) => {
  for (let i = 0; i < text.length; i++) {
    const subStr = text.substr(0, i + 1);
    const newChar = text.charAt(i);
    input.value = subStr;

    Simulate.input(input, {
      inputType: 'insertText',
      data: newChar,
    });

    const options = {
      key: newChar,
      charCode: 0, // Only set on keypress

      // keycode and which are set to uppercase for keydown/keyup events
      keyCode: newChar.toUpperCase().charCodeAt(0),
      which: newChar.toUpperCase().charCodeAt(0),
      code: `Key${newChar.toUpperCase()}`,
    };

    Simulate.keyDown(input, options);
    Simulate.keyPress(input, {
      ...options,
      charCode: newChar.charCodeAt(0),
      keyCode: newChar.charCodeAt(0),
      which: newChar.charCodeAt(0),
    });
    Simulate.keyUp(input, options);
  }
  Simulate.change(input, {target: {value: text}});
};

describe('Tip Calculator', () => {
  beforeEach(() => {
    resetDom();
  });

  afterEach(() => {
    rootContainer.remove();
    rootContainer = null;
  });

  describe('labels', () => {
    const expected_labels = ['Bill', 'Tip Percentage', 'Number of People'];

    it('have the correct text content', () => {
      labels.forEach((label, i) => {
        expect(label.textContent.trim()).to.equal(expected_labels[i]);
      });
    });
  });

  describe('inputs', () => {
    it('bill input has the correct attributes and default value', () => {
      const input = inputs[0];
      expect(input.type).to.equal('number');
      expect(input.value).to.equal('50');
    });

    it('bill input can be updated', () => {
      // const input = inputs[0];
      // typeInInput(input, '10');
      // expect(input.value).to.equal('10');
      // typeInInput(input, '15');
      // expect(input.value).to.equal('15');
      const input = inputs[0];
      fireEvent.change(input, {target: {value: '10'}});
      expect(input.value).to.equal('10');
      fireEvent.change(input, {target: {value: '15'}});
      expect(input.value).to.equal('15');
    });
  });

  describe('paragraphs', () => {
    it('have the correct initial text', () => {
      const expected_paragraphs = ['Total Tip: $9.00', 'Tip Per Person: $9.00'];

      expect(paragraphs.length).to.equal(2);
      paragraphs.forEach((label, i) => {
        expect(label.textContent.trim()).to.equal(expected_paragraphs[i]);
      });
    });
  });
});
