import React from 'react';
import AppBar from 'material-ui/AppBar';
import {blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: blue500,
    },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default function App(props) {
        const middle = props.state === null ? <h1>{props.state}</h1> : <h2>No state</h2>;
        return <MuiThemeProvider muiTheme={muiTheme}>
    <div>
            <AppBar title="Example App" onLeftIconButtonTouchTap={props.handleToggle} />
    {middle}
            </div></MuiThemeProvider>
}
