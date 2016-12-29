import util from 'util';

const reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

import('./ui_module').then(function(ui_module) {
    const {ReactDOM, React} = ui_module;
    ReactDOM.render(<h1>Loaded ui_module</h1>, reactRoot);
    import('./data_module').then(function(data_module) {
        alert(`data_module loaded: ${util.inspect(data_module, {depth: 6})}`);
    });
});
