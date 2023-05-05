import React from 'react';
import logo from './logo.svg';
import { createNode } from '@rootzjs/core';

// Import Styles
import './App.css';


const [node, dispatchNode] = createNode("App", ({
      props,
      state,
      actions
}) => {
      // conditional redering of btn based on state.isClicked
      const RenderCurrentBtn = function () {
            if (state.isClicked) {
                  return (
                        <button className="app-btn-clicked">
                              Yay! It's Just that simple...
                        </button>
                  )
            } else {
                  return (
                        <button className="app-btn" onClick={actions.ON_BTN_CLICK}>
                              Click here to update the state
                        </button>
                  )
            }
      }
      return (
            <div className="app">
                  <div className="app-upper-section">
                        <img src={logo} className="app-logo" alt="logo" />
                        <div className="app-title">Rootz JS</div>
                  </div>
                  <div className="app-lower-section">
                        <div className="app-btn-container">
                              <RenderCurrentBtn />
                              <a
                                    target="_blank"
                                    className="app-btn-link"
                                    rel="noopener noreferrer"
                                    href="https://rootzjs.org"
                              >
                                    Learn Rootz JS
                              </a>
                        </div>
                        <p>
                              Edit <code>src/App.jsx</code> and save to reload.
                        </p>
                  </div>
            </div>
      );
});

// node definition
node.state({ isClicked: false });
node.useAction("ON_BTN_CLICK", { isClicked: true });

// dispatch the created Node
export const App = dispatchNode(node);
