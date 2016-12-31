import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

let state = null;

function handleToggle() {
    console.log(`handleToggle, state: ${state}`);
    if (!state) {
        state = 'TOGGLED';
    } else {
        state = null;
    }
    entry();
}

const reactRoot = document.createElement('div');
reactRoot.id = 'my-react-root';
document.body.appendChild(reactRoot);

export default function entry() {
    ReactDOM.render(<App state={state} handleToggle={handleToggle} />, reactRoot);
}
entry();
