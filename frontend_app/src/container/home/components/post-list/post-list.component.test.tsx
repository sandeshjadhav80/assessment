// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import PostListComponent from './post-list.component';

let container:any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render component and check title render correctly or not", () => {
  act(() => {
    render(<PostListComponent postList={[{title: 'first title', text: 'second test'}]} />, container);
  });
  expect(container.querySelector('h3').textContent).toBe("first title");
});

it("render component and check text render correctly or not", () => {
    act(() => {
      render(<PostListComponent postList={[{title: 'first title', text: 'text content'}]} />, container);
    });
    expect(container.querySelector('.text').textContent).toBe("text content");
});
