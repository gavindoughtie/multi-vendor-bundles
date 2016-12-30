import React from 'react';
import ReactDOM from 'react-dom';

export default function entry() {
    const reactRoot = document.createElement('div');
    reactRoot.id = 'my-react-root';
    document.body.appendChild(reactRoot);
    ReactDOM.render(<h1>Loaded All Modules</h1>, reactRoot);
}
entry();
